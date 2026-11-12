'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { copyState, stageTransform } from '@/lib/story-layout';
import { STORY_BACKGROUND, STORY_FRAME_COUNT, STORY_FRAME_SIZE, frameForProgress, storyFrameUrl, storyScenes } from '@/lib/story-scenes';

const BEHIND = 30; // decoded frames kept behind the playhead (reverse scrolling)
const AHEAD = 60; // frames prefetched ahead of the playhead
const CONCURRENCY = 4;
const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

type Options = {
  /** the element that wraps the whole story (all sections) */
  root: RefObject<HTMLElement | null>;
  canvas: RefObject<HTMLCanvasElement | null>;
  sections: RefObject<(HTMLElement | null)[]>;
  onActive?: (index: number) => void;
  onReady?: () => void;
};

/**
 * Scroll-scrubbed canvas frame sequence.
 * The frame is a pure function of scroll position: scene i spans section i, so scrolling back plays the
 * sequence backwards deterministically. Frames load progressively around the playhead; if one is not yet
 * decoded the nearest loaded frame stays on screen (never blank, never frame 0).
 */
export function useStoryFrames({ root, canvas, sections, onActive, onReady }: Options) {
  useEffect(() => {
    const rootEl = root.current;
    const canvasEl = canvas.current;
    if (!rootEl || !canvasEl) return;
    const ctx2d = canvasEl.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    const mq = window.matchMedia(DESKTOP_MOTION);
    let teardown: (() => void) | undefined;

    const start = () => {
      teardown?.();
      teardown = undefined;
      if (!mq.matches) return; // mobile / tablet portrait / reduced motion: static posters, no canvas work
      teardown = run(rootEl, canvasEl, ctx2d);
    };

    function run(rootEl: HTMLElement, canvasEl: HTMLCanvasElement, ctx2d: CanvasRenderingContext2D) {
      gsap.registerPlugin(ScrollTrigger);
      const images = new Map<number, HTMLImageElement>();
      const loading = new Set<number>();
      let target = 0;
      let drawn = -1;
      let raf = 0;
      let cancelled = false;
      let ready = false;
      let activeScene = -1;
      let cssW = 0;
      let cssH = 0;

      const nearest = (i: number) => {
        const hit = images.get(i);
        if (hit) return hit;
        for (let d = 1; d < STORY_FRAME_COUNT; d++) {
          const a = images.get(i - d) ?? images.get(i + d);
          if (a) return a;
        }
        return null;
      };

      const paint = () => {
        raf = 0;
        if (cancelled || !cssW) return;
        const img = nearest(target);
        if (!img) return;
        const exact = images.has(target);
        if (target === drawn && exact) return;
        const dpr = canvasEl.width / cssW;
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
        // the stage box is 16:9 like the frames; paint the story backdrop first so sub-pixel rounding never shows black
        ctx2d.fillStyle = STORY_BACKGROUND;
        ctx2d.fillRect(0, 0, cssW, cssH);
        const scale = Math.max(cssW / STORY_FRAME_SIZE.width, cssH / STORY_FRAME_SIZE.height);
        const w = STORY_FRAME_SIZE.width * scale;
        const h = STORY_FRAME_SIZE.height * scale;
        ctx2d.drawImage(img, (cssW - w) / 2, (cssH - h) / 2, w, h);
        drawn = exact ? target : drawn;
        if (!ready) {
          ready = true;
          onReady?.();
        }
      };
      const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };

      let inFlight = 0;
      const pump = () => {
        if (cancelled) return;
        const from = Math.max(0, target - BEHIND);
        const to = Math.min(STORY_FRAME_COUNT - 1, target + AHEAD);
        // evict decoded frames far outside the window to cap memory
        for (const k of images.keys()) if (k < from - 20 || k > to + 20) images.delete(k);
        for (let d = 0; d <= Math.max(AHEAD, BEHIND) && inFlight < CONCURRENCY; d++) {
          for (const i of [target + d, target - d]) {
            if (i < from || i > to || images.has(i) || loading.has(i) || inFlight >= CONCURRENCY) continue;
            loading.add(i);
            inFlight++;
            const img = new Image();
            img.decoding = 'async';
            img.src = storyFrameUrl(i);
            img.decode().then(() => { if (!cancelled) images.set(i, img); }).catch(() => undefined).finally(() => {
              loading.delete(i);
              inFlight--;
              if (i === target) schedule();
              pump();
            });
          }
        }
      };

      const resize = () => {
        const rect = canvasEl.getBoundingClientRect();
        cssW = rect.width;
        cssH = rect.height;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvasEl.width = Math.round(cssW * dpr);
        canvasEl.height = Math.round(cssH * dpr);
        drawn = -1;
        schedule();
      };

      // diagonal stage glide + synced copy reveal, written as CSS variables (no React re-render per scroll tick)
      const applyLayout = (s: number, list: HTMLElement[]) => {
        const st = stageTransform(s, list.length);
        rootEl.style.setProperty('--stage-p', st.p.toFixed(4));
        rootEl.style.setProperty('--stage-y', `${st.y.toFixed(3)}svh`);
        rootEl.style.setProperty('--stage-r', `${st.r.toFixed(3)}deg`);
        list.forEach((el, i) => {
          const c = copyState(s, i, list.length);
          el.style.setProperty('--v', c.v.toFixed(3));
          el.style.setProperty('--ty', c.ty.toFixed(3));
        });
      };

      // pure function of scroll: which section crosses the viewport's reading line, and how far through it
      const update = () => {
        const list = (sections.current ?? []).filter(Boolean) as HTMLElement[];
        if (!list.length) return;
        const line = window.innerHeight * 0.5;
        let idx = 0;
        let progress = 0;
        const first = list[0].getBoundingClientRect();
        const last = list[list.length - 1].getBoundingClientRect();
        if (line < first.top) { idx = 0; progress = 0; }
        else if (line > last.bottom) { idx = list.length - 1; progress = 1; }
        else {
          for (let i = 0; i < list.length; i++) {
            const r = list[i].getBoundingClientRect();
            if (line >= r.top && line <= r.bottom) { idx = i; progress = (line - r.top) / Math.max(1, r.height); break; }
          }
        }
        target = frameForProgress(storyScenes[idx], progress);
        applyLayout(idx + progress, list);
        if (idx !== activeScene) { activeScene = idx; onActive?.(idx); }
        pump();
        schedule();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(canvasEl);
      resize();
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: rootEl,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: update,
          onRefresh: update,
        });
      }, rootEl);
      update();

      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        for (const k of ['--stage-p', '--stage-y', '--stage-r']) rootEl.style.removeProperty(k);
        for (const el of sections.current ?? []) { el?.style.removeProperty('--v'); el?.style.removeProperty('--ty'); }
        ro.disconnect();
        ctx.revert();
        images.clear();
        loading.clear();
      };
    }

    start();
    mq.addEventListener('change', start);
    return () => {
      mq.removeEventListener('change', start);
      teardown?.();
    };
  }, [root, canvas, sections, onActive, onReady]);
}
