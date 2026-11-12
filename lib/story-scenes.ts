import scenesJson from '@/data/story/scenes.json';

// Scene/frame configuration for the Petra illustrated story.
// Source of truth: data/story/scenes.json (frame bounds at 12 FPS). Media lives in public/media/petra-story/.
export const STORY_MEDIA_BASE = '/media/petra-story';
export const STORY_FRAME_SIZE = { width: 960, height: 540 } as const;
export const STORY_BACKGROUND = '#F2E9DA';

export type StoryScene = {
  id: string;
  slug: string;
  /** first frame index of the scene */
  start: number;
  /** last frame index of the scene (inclusive) */
  end: number;
  poster: string;
};

export const storyScenes: StoryScene[] = scenesJson.scenes.map((s) => ({
  id: s.id,
  slug: s.slug,
  start: s.frames12fps.start,
  end: s.frames12fps.endExclusive - 1,
  poster: `${STORY_MEDIA_BASE}/posters/${s.id}.webp`,
}));

export const STORY_FRAME_COUNT = storyScenes[storyScenes.length - 1].end + 1;

export const storyFrameUrl = (index: number) =>
  `${STORY_MEDIA_BASE}/frames/petra-frame-${String(index).padStart(3, '0')}.webp`;

/** Maps progress (0..1) through a scene to a frame index inside that scene's range. */
export function frameForProgress(scene: StoryScene, progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  return Math.round(scene.start + p * (scene.end - scene.start));
}
