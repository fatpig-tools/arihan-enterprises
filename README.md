# Arihan Enterprises website

Marketing site for Arihan Enterprises (heavy machinery hire and contract execution).

- `web/` — Next.js 16 site (App Router, Tailwind v4, GSAP, Motion, Lottie)
- `studio/` — standalone Sanity Studio (content schemas, sidebar structure, seed script)

## Run the site

```bash
cd web
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

With no Sanity project ID set, the site runs on the bundled content in
`web/src/content/site.ts`. Text in `[square brackets]` there is unconfirmed and
renders with a dashed amber highlight until a real value replaces it.

## Connect Sanity

1. Create the Sanity project. The organisation is managed by Vercel, so add it
   from the Vercel dashboard (Storage / Marketplace → Sanity), not from the
   Sanity CLI.
2. Put the project ID in `web/.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`) and
   `studio/.env` (`SANITY_STUDIO_PROJECT_ID`).
3. In `studio/`: `npx sanity login`, then `npm run schema:deploy`,
   `npm run seed` (loads the bundled content), and `npm run dev` or
   `npm run deploy`.
4. For the quote form, create an Editor token in Sanity and set
   `SANITY_API_WRITE_TOKEN` in `web/.env.local`. Enquiries are stored as
   "Quote request" documents; without the token the form tells visitors to call.

Client names appear on the site only when "Approved for public use" is on.
Projects and testimonials appear once they are added in the Studio.

## Where things are

| What | Where |
| --- | --- |
| Design tokens and type (Cormorant Garamond with italic emphasis, Jost) | `web/src/app/globals.css` |
| Footage and photos (Pexels; credits in `CREDITS.md`) | `web/public/media/` |
| Scroll story film (rendered by `web/scripts/render-story.py`) | `web/src/components/home/Story.tsx`, `web/public/media/story/` |
| Lottie icons (generated) | `node web/scripts/make-lottie.mjs` → `web/src/lottie/` |
| Scroll animation helpers | `web/src/components/{Reveal,SplitHeading,Counter,Process}.tsx` |
| Quote form and API route | `web/src/components/QuoteForm.tsx`, `web/src/app/api/quote/route.ts` |
| CMS queries and fallback logic | `web/src/sanity/`, `web/src/lib/data.ts` |
