import type { RefObject } from 'react';
import { STORY_FRAME_SIZE, storyScenes } from '@/lib/story-scenes';

/**
 * Sticky illustration stage (desktop only, hidden by CSS on small screens / reduced motion).
 * The first poster is plain HTML so it paints before any JS; the canvas takes over once a frame is drawn.
 */
export function StoryStage({ canvas, ready }: { canvas: RefObject<HTMLCanvasElement | null>; ready: boolean }) {
  return (
    <div className="story-stage" aria-hidden="true">
      <div className="story-stage-frame" data-ready={ready}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="story-stage-poster" src={storyScenes[0].poster} alt="" width={STORY_FRAME_SIZE.width} height={STORY_FRAME_SIZE.height} fetchPriority="high" decoding="async" />
        <canvas className="story-stage-canvas" ref={canvas} />
      </div>
    </div>
  );
}
