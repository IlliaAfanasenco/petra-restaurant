export const SITE_NAME = 'Petra Bar & Kitchen';
export const LOGO_SRC = '/brand/petra-logo.webp';
// Logo aspect ratio 1570 x 1001
export const LOGO_SIZE = { width: 1570, height: 1001 } as const;
export const OG_IMAGE = '/brand/og-image.png';
/** Returns the origin of `value` if it is a valid absolute http(s) URL, otherwise null (empty / unset / malformed). */
function toOrigin(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.origin : null;
  } catch {
    return null;
  }
}

// Public origin of the site (metadataBase, canonical, hreflang, Open Graph). First valid value wins:
// NEXT_PUBLIC_SITE_URL, SITE_URL, then RENDER_EXTERNAL_URL (set by Render to the service's real URL).
// An empty string (e.g. a Docker ARG that was never passed) counts as unset. The localhost default only
// applies to local development; set NEXT_PUBLIC_SITE_URL to the real domain in production.
export const SITE_URL =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  toOrigin(process.env.SITE_URL) ??
  toOrigin(process.env.RENDER_EXTERNAL_URL) ??
  'http://localhost:3000';
