# Server-side code dropped during the Astro port

The source (`genai/`) was a TanStack Start app with an SSR server entry and
server route handlers. Astro here is configured for `output: 'static'`, so
the following server-only code does **not** translate and was dropped. Each
item below is a `TODO:` if equivalent behavior is ever needed.

## Dropped files

- **`genai/src/server.ts`** — SSR error-wrapper around
  `@tanstack/react-start/server-entry`. Normalizes h3-swallowed 500s into a
  rendered error page.
  - `TODO:` No equivalent in static Astro. Astro renders a static 404
    (`src/pages/404.astro`, not yet created) and the host serves it. The
    `genai` `NotFoundComponent` / `ErrorComponent` (from `__root.tsx`) were
    not ported — add a `src/pages/404.astro` if a custom 404 is wanted.

- **`genai/src/start.ts`** — TanStack Start client/router bootstrap. Not
  applicable to Astro's island model.

- **`genai/src/router.tsx`**, **`genai/src/routeTree.gen.ts`** — TanStack
  Router wiring and generated route tree. Replaced by Astro file-based
  routing under `src/pages/`.

- **`genai/src/routes/sitemap[.]xml.ts`** — server `GET` handler that built
  `/sitemap.xml` from the static paths + post slugs.
  - `TODO:` Replaced by the `@astrojs/sitemap` integration already wired in
    `astro.config.mjs`, which generates `sitemap-index.xml` at build time.
    The handler's exact `<changefreq>weekly</changefreq>` shape is not
    reproduced; if that specific format is required, add a custom
    `src/pages/sitemap.xml.ts` endpoint.

- **`genai/src/lib/config.server.ts`**, **`genai/src/lib/api/example.functions.ts`**
  — server-only config and example server functions. No operator-visible
  output; dropped.

- **`genai/src/lib/error-capture.ts`**, **`genai/src/lib/error-page.ts`**,
  **`genai/src/lib/lovable-error-reporting.ts`** — SSR error capture /
  reporting plumbing tied to the Lovable/TanStack runtime. Dropped.

## Components not ported

- **`genai/src/components/ui/*`** (47 shadcn/ui React components) and
  **`genai/src/hooks/use-mobile.tsx`** — none are imported by any route or by
  `site-nav`. They are unreferenced in the source, so they were intentionally
  left unported rather than dragging in the full Radix UI + lucide-react
  dependency set for dead code. Re-port individually (as React islands via
  `@astrojs/react`) if a page ever needs them.

## Ported instead

- `genai/src/routes/__root.tsx` chrome (`SiteNav` + `SiteFooter`) →
  `src/components/Header.astro` + `src/components/Footer.astro`, composed in
  `src/layouts/Layout.astro`.
- The React `ThemeToggle` (localStorage dark/light) → inline vanilla script
  in `Header.astro` + a no-FOUC bootstrap in `BaseHead.astro`.
- `genai/src/lib/content.ts` (projects + markdown posts) → `src/lib/content.ts`
  (relative `?raw` imports instead of the `@/` alias).
