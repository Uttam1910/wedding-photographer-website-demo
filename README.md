# lens & love — Wedding Photography (demo template #3)

A frontend-only, interactive demo website for wedding photographers.
React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · lucide-react. No backend.

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```

## Customising for a studio

Everything a studio changes lives in **`src/config/photographer.ts`**: name, tagline,
phone, email, WhatsApp number, Instagram/YouTube/Facebook URLs, service areas,
studio hours, brand colours (applied as CSS variables) and `showDemoLabels`.

Content is kept separate from components in `src/data/`:

| File | Content |
| --- | --- |
| `images.ts` | Photo registry: key → Pexels ID, orientation, alt text |
| `portfolio.ts` | Categories and gallery items |
| `weddings.ts` | Featured wedding story (chapters, quote) |
| `packages.ts` | Packages and prices |
| `films.ts` | Wedding film cards |
| `testimonials.ts` | Reviews (demo) |
| `instagram.ts` | Instagram grid photos |

Images live in `public/images/<key>-sm.webp` (≈720px) and `<key>-lg.webp` (≈1600px).

## Routes

`/` home · `/stories/aarav-meera` featured story · `/privacy` · `/terms` · `/credits` · anything else → 404.
`vercel.json` and `public/_redirects` (Netlify) provide the SPA fallback.

## Demo content

Studio, couples, testimonials, statistics, prices and contact details are fictional
placeholders and are labelled as demo content on the site. The enquiry form never sends data.
Contact placeholders (`+91 00000 00000`, `hello@example.com`, `wa.me/910000000000`)
and the `@lensandlove` handle must be replaced before launch.

## Photo credits

All photographs are from [Pexels](https://www.pexels.com/license/) (free for commercial
use; attribution not required). The full source list, with links, is on the `/credits` page
and in `src/data/images.ts`.
# wedding-photographer-website-demo
