import { Cormorant_Garamond, Frank_Ruhl_Libre, Heebo, Manrope } from 'next/font/google';

// Latin + Cyrillic display / body pair. Hebrew glyphs fall through to the Hebrew families below
// (see --font-display / --font-body in globals.css), so mixed-script strings stay coherent.
export const cormorant = Cormorant_Garamond({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--f-cormorant', display: 'swap' });
export const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--f-manrope', display: 'swap' });
export const frankRuhl = Frank_Ruhl_Libre({ subsets: ['hebrew'], weight: ['400', '500', '700'], variable: '--f-frank', display: 'swap' });
export const heebo = Heebo({ subsets: ['hebrew'], variable: '--f-heebo', display: 'swap' });

export const fontVariables = [cormorant, manrope, frankRuhl, heebo].map((f) => f.variable).join(' ');
