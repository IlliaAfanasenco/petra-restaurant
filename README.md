# Petra Bar & Kitchen — website

Independent Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 site for Petra Bar & Kitchen (Georgian restaurant, Israel). Technical base copied from the SULI concept; the original SULI project is untouched.

- Locales: `/he` (default, RTL), `/ru`, `/en`
- Menu: single catalog `data/menu/menu.json` (types in `data/menu/types.ts`), rendered by `components/menu/*`
- Brand assets: `public/brand/petra-logo.webp` (original logo), `app/icon.png`, `app/apple-icon.png`, `public/brand/og-image.png` (logo resized onto a dark background)
- Set `NEXT_PUBLIC_SITE_URL` in production (used for Open Graph / metadataBase)

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck && pnpm lint && pnpm build
```

## To confirm before publishing
- Menu is a draft from screenshots: prices, translations, ingredients, allergens, price variants (`priceILS: null`), hours and delivery terms need restaurant approval.
- `image: null` for all 130 items — add owner-provided photos only.
- Real address, hours and contacts are not set (footer placeholders).
# petra-restaurant
