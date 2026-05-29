# Why I migrated off Vite for SEO

Vite is excellent for building apps. It is not excellent for building content sites that need to be crawled, ranked, and shared.

## The core problem

A default Vite + React app ships an empty HTML shell and hydrates content on the client. For users on fast connections this is fine. For Googlebot, for link previews, for archive crawlers, and for anyone on a slow network, it's a degraded experience.

You can paper over this with prerendering plugins, but at that point you're rebuilding what an SSR framework gives you for free.

## What I moved to

A framework that does server-side rendering and static generation as first-class concerns. Every page is real HTML on first byte. View source shows the actual content. og:image, canonical, structured data — all set per route, all visible to crawlers.

## What I lost

Almost nothing. The mental model is slightly different. The build is a little slower. That's the entire cost.

## What I gained

Pages that exist for search engines, not just for browsers.