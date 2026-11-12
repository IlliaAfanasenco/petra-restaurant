// Pure geometry for the alternating story layout. Section i spans s ∈ [i, i+1] where s is the scroll
// coordinate computed by use-story-frames. Even sections: copy at inline-start, stage at inline-end (p = 1).
// Odd sections: mirrored (p = 0). Everything here is a pure function of s, so scrolling back reverses exactly.

export const STAGE_WIDTH_PCT = 58;
/** half-width (in sections) of the diagonal glide centred on each section boundary */
const GLIDE = 0.3;
/** vertical offset of the stage in svh units: even sections sit slightly low, odd slightly high → true diagonal */
const Y_AMPLITUDE = 4;
const TILT_DEG = 1.6;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export const stageSide = (index: number) => (index % 2 === 0 ? 1 : 0);

export type StageTransform = { p: number; y: number; r: number };

export function stageTransform(s: number, count: number): StageTransform {
  let p = stageSide(0);
  let arc = 0;
  let dir = 0;
  for (let b = 1; b < count; b++) {
    const t = smooth(clamp01((s - (b - GLIDE)) / (2 * GLIDE)));
    p += (stageSide(b) - stageSide(b - 1)) * t;
    if (t > 0 && t < 1) { arc = Math.sin(Math.PI * t); dir = stageSide(b) - stageSide(b - 1); }
  }
  // y follows p (high when p=0, low when p=1) so the path is diagonal; the arc adds a gentle swoop
  const y = (p - 0.5) * 2 * Y_AMPLITUDE - arc * 1.5;
  const r = dir * arc * TILT_DEG;
  return { p, y, r };
}

export type CopyState = { v: number; ty: number };

/** Visibility 0..1 of a section's copy plus its vertical slide factor (-1 exiting upward … +1 entering from below). */
export function copyState(s: number, index: number, count: number): CopyState {
  const enter = index === 0 ? 1 : smooth(clamp01((s - (index - 0.15)) / 0.3));
  const exit = index === count - 1 ? 1 : smooth(clamp01((index + 1.15 - s) / 0.3));
  const v = Math.min(enter, exit);
  const ty = enter < 1 ? 1 - enter : exit < 1 ? -(1 - exit) : 0;
  return { v, ty };
}
