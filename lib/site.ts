export const SITE_NAME = 'Petra Bar & Kitchen';
export const LOGO_SRC = '/brand/petra-logo.webp';
// Logo aspect ratio 1570 x 1001
export const LOGO_SIZE = { width: 1570, height: 1001 } as const;
export const OG_IMAGE = '/brand/og-image.png';
// Set NEXT_PUBLIC_SITE_URL in production; the domain of the new Petra site is not decided yet.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
