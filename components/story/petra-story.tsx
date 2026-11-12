'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CategoryView, DishView } from '@/data/menu/home';
import type { Dictionary, Locale } from '@/lib/i18n';
import { SITE_NAME } from '@/lib/site';
import { storyScenes } from '@/lib/story-scenes';
import { StoryStage } from './story-stage';
import { StorySection } from './story-section';
import { StoryDish } from './story-dish';
import { StoryMenuTeaser } from './story-menu-teaser';
import { useStoryFrames } from './use-story-frames';

export type StoryProps = {
  locale: Locale;
  t: Dictionary;
  signature: DishView;
  tradition: DishView;
  teaser: CategoryView[];
};

const [BRAND_FIRST, ...BRAND_REST] = SITE_NAME.split(' ');

export function PetraStory({ locale, t, signature, tradition, teaser }: StoryProps) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const onReady = useCallback(() => setReady(true), []);
  const onActive = useCallback((i: number) => setActive(i), []);
  useStoryFrames({ root, canvas, sections, onActive, onReady });

  const ref = (i: number) => (el: HTMLElement | null) => { sections.current[i] = el; };
  const [hospitality, dough, born, discover, oven] = t.story6.scenes;
  const sc = storyScenes;
  const menuHref = `/${locale}/menu`;
  const arrow = <ArrowUpRight size={17} />;

  return (
    <div className="petra-story" id="top" ref={root} data-active-scene={sc[active]?.id} role="region" aria-label={t.story6.label}>
      <StoryStage canvas={canvas} ready={ready} />
      <div className="story-sections">
        {/* 1 — Hero: copy inline-start, egg inline-end */}
        <StorySection scene={sc[0]} index={0} sectionRef={ref(0)} priority titleTag="h1" kicker={t.hero.eyebrow}
          title={<>{BRAND_FIRST} <em>{BRAND_REST.join(' ')}</em></>}>
          <p className="story-lead">{t.hero.titleFirst} {t.hero.titleAccent}</p>
          <p className="story-body">{t.hero.description}</p>
          <div className="story-actions">
            <Link href={menuHref} className="story-btn story-btn-solid">{t.hero.menu}{arrow}</Link>
            <a href="#reserve" className="story-btn story-btn-outline">{t.hero.reserve}{arrow}</a>
          </div>
        </StorySection>

        {/* 2 — Signature dish: egg crosses the page and cracks; the real Adjarian khachapuri is introduced */}
        <StorySection scene={sc[1]} index={1} sectionRef={ref(1)} kicker={t.home.signatureKicker} title={signature.name}>
          <p className="story-body">{born.body}</p>
          <StoryDish dish={signature} href={`${menuHref}#menu-georgian`} cta={t.home.seeInMenu} lead />
        </StorySection>

        {/* 3 — Georgian traditions: the dough continues */}
        <StorySection scene={sc[2]} index={2} id="story" sectionRef={ref(2)} kicker={hospitality.kicker} title={hospitality.title}>
          <p className="story-body">{hospitality.body}</p>
          <blockquote className="story-quote">{t.story.quote}</blockquote>
          <p className="story-body story-body-sm">{dough.body}</p>
          <StoryDish dish={tradition} href={`${menuHref}#menu-georgian`} cta={t.home.seeInMenu} size="sm" />
        </StorySection>

        {/* 4 — The Petra experience */}
        <StorySection scene={sc[3]} index={3} id="experience" sectionRef={ref(3)} kicker={t.experience.eyebrow} title={t.experience.title}>
          <p className="story-body">{t.experience.body}</p>
          <ul className="story-values">
            <li>{t.experience.line1}</li>
            <li>{t.experience.line2}</li>
            <li>{t.experience.line3}</li>
          </ul>
        </StorySection>

        {/* 5 — Discover our menu */}
        <StorySection scene={sc[4]} index={4} sectionRef={ref(4)} kicker={discover.kicker} title={discover.title}>
          <p className="story-body">{discover.body}</p>
          <StoryMenuTeaser categories={teaser} menuHref={menuHref} label={t.home.menuHighlights} />
          <div className="story-actions">
            <Link href={menuHref} className="story-btn story-btn-solid">{t.story6.fullMenu}{arrow}</Link>
          </div>
        </StorySection>

        {/* 6 — The final dish */}
        <StorySection scene={sc[5]} index={5} sectionRef={ref(5)} kicker={oven.kicker} title={oven.title} finale>
          <p className="story-body">{oven.body}</p>
          <div className="story-actions">
            <Link href={menuHref} className="story-btn story-btn-solid">{t.hero.menu}{arrow}</Link>
            <a href="#reserve" className="story-btn story-btn-outline">{t.hero.reserve}{arrow}</a>
          </div>
        </StorySection>
      </div>
    </div>
  );
}
