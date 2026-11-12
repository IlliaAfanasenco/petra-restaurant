import type { ReactNode, Ref } from 'react';
import { STORY_FRAME_SIZE, type StoryScene } from '@/lib/story-scenes';
import { stageSide } from '@/lib/story-layout';

type Props = {
  scene: StoryScene;
  index: number;
  id?: string;
  kicker?: string;
  titleTag?: 'h1' | 'h2';
  title: ReactNode;
  children?: ReactNode;
  sectionRef?: Ref<HTMLElement>;
  priority?: boolean;
  /** larger, centred-feel headline for the finale */
  finale?: boolean;
};

/**
 * One story chapter. The inline poster is the static / mobile / reduced-motion illustration;
 * on desktop with motion enabled it is hidden and the shared sticky stage shows the scrubbed frames.
 * data-stage tells CSS which inline side the stage occupies (copy takes the opposite side).
 */
export function StorySection({ scene, index, id, kicker, titleTag: Title = 'h2', title, children, sectionRef, priority, finale }: Props) {
  return (
    <section className="story-section" id={id} ref={sectionRef} data-scene={scene.id} data-stage={stageSide(index) ? 'end' : 'start'} data-finale={finale || undefined} aria-labelledby={`${scene.id}-title`}>
      <div className="story-section-inner">
        <figure className="story-figure" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={scene.poster} alt="" width={STORY_FRAME_SIZE.width} height={STORY_FRAME_SIZE.height} loading={priority ? 'eager' : 'lazy'} decoding="async" />
        </figure>
        <div className="story-copy">
          <span className="story-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          {kicker && <span className="story-kicker">{kicker}</span>}
          <Title id={`${scene.id}-title`} className="story-title">{title}</Title>
          {children}
        </div>
      </div>
    </section>
  );
}
