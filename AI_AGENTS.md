# AI Agent Context — vijocherian.com

## Summary

*one paragraph: what this site is, what it does*

Vijo Cherian is an independent founder/engineer with a career spine in embedded Linux, Kubernetes, and cloud infrastructure, currently focused on building YouTube trend detection and creator tooling under the Swiftly umbrella. The site centralizes that work — projects in flight, writing about what he's learning, and a CV maintained for opportunities when they arise. Understated by design: no personal-brand performance, no hero illustrations, just a clean archive of what he's doing and what he knows.

## Audience

*one sentence: who this is for (broad demographic)*

Technical peers, prospective collaborators or customers evaluating the projects, and recruiters or hiring managers vetting him for embedded/infra roles.

## ICP

*the specific ideal customer — demographics, pain points, what they use today. More detail than Audience: Audience is the broad demo ("homeowners with EV chargers"), ICP is the specific targetable subset ("Tesla owners in CA who installed in last 90d, paid $2k+")*

A senior engineering manager or founder at an edge-computing, robotics, IoT, or infrastructure-heavy company who lands on a technical post, reads it through, then clicks into the CV. Secondary high-value visitors are creators or operators who arrive via a YouTube tool or trend post and convert into newsletter subscribers for Swiftly. Both audiences are served by the same site without conflict — systems writing and founder writing reinforce a single signal: this person ships, technically and commercially.

## Goals

*1-2 sentences: primary business / product goal*

Establish a durable, indexable home for Vijo's name and work that compounds in SEO and credibility over time. Keep a CV that's always current and shareable, so the site does the heavy lifting when job or partnership conversations arise.

## Tech stack

Astro project under the sites/* workspace. Build path goes
through the parent `sites/Makefile` (Docker-orchestrated) which delegates
per-stack work to the central builder at `~/work/projects/builder/`.

## Project structure

- `src/` — application source
- `public/` — static assets copied to `dist/` at build (favicons, OG images, `_headers`)
- `docs/` — PRD, Prompts log
- `Makefile` — thin forwarder to `../Makefile`
- `wrangler.jsonc` — Cloudflare deploy config
- `scripts/` *(if present)* — ingester or build-time helpers

## Building info

All dev work runs inside the parent `sites1` docker container. The host doesn't
need Node/pnpm installed; the container does. The parent `Makefile`
(`../Makefile` from this dir) is the canonical entry point.

### Why docker

- Pinned Node + pnpm versions match Cloudflare's build env.
- Avoids polluting the host with per-project node_modules.
- Same image serves every sibling project under sites/.

### Common Makefile targets

This project's local `Makefile` forwards every target to `../Makefile` with
`proj=vijocherian.com`, so these all work either from this dir or from `sites/`:

| Command | What it does |
|---|---|
| `make buildsh` *(from `sites/`)* | Drop into a bash shell inside the docker container at `/usr/src/app` (= `sites/` mounted in). |
| `make run` *(from here)* / `make run proj=vijocherian.com` *(from `sites/`)* | `pnpm install` then start dev server (auto-detected). |
| `make check-vite proj=vijocherian.com` | Start the dev server, skipping install. |
| `make test proj=vijocherian.com` | `pnpm install` + `pnpm build` + `pnpm test`. **Hard-fails outside docker** — `make buildsh` first, or `docker exec`. |
| `make deps` | Install pnpm globally (image bootstrap). |
| `make clean` *(from `sites/`)* | Remove root `package.json`, lockfile, node_modules. Don't run inside a project dir. |

### Running Make targets from a Claude Code session

The Bash tool runs on the host as `vijo`, not inside docker. To execute a
target inside the container, find the running container and `docker exec` in:

```bash
docker ps                                               # find the sites1 container name
docker exec -w /usr/src/app <name> make test proj=vijocherian.com
```

## Deployment info

- **Platform:** Cloudflare Workers (Static Assets) — *not* Vercel.
- **Config:** `wrangler.jsonc` at the repo root — points `assets.directory` at `./dist` and uses `not_found_handling: "single-page-application"` for SPA client-side routing.
- **Headers:** `public/_headers` — cache (`/assets/*` immutable, HTML no-cache) + security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`). Vite copies `public/` into `dist/` at build, so the file ships with the assets.
- **Build:** `pnpm build` → `dist/`. Wrangler picks up `dist/` via `wrangler.jsonc`.
- **Deploy:** `wrangler deploy` (locally) or via Cloudflare's Git integration on push.
  Initial GitHub repo + CF Pages project setup is automated by the portfolio CLI:
  `cd ../portfolio && make run ARGS="deploy vijocherian.com"` runs `gh repo create` and
  POSTs to the CF Pages API with `build_command="pnpm run build"` set explicitly
  (avoids the bun-detection trap kwizicle.com hit). Idempotent; safe to re-run.
- **Vite version:** must be ≥ 6.0.0 — Wrangler's Vite integration rejects Vite 5.
- **Env vars:** set `VITE_*` vars (e.g. `VITE_GA_ID`) in the Cloudflare Workers project's environment-variable settings — they're inlined at build time.
- **Live URL:** https://vijocherian.com/  *(update once first deploy succeeds)*
- **Legacy:** if a `vercel.json` or `.vercelignore` is present from a Lovable export, it's inert on Cloudflare and safe to delete.

## Content strategy

*what content this site needs — page types, initial topics, format mix (long-form vs reference vs tool)*

Two parallel low-cadence writing tracks. The first is build-in-public notes from the founder work — pSEO, trend detection, automation — which feeds the Swiftly funnel and demonstrates commercial judgment. The second is technical writing from the systems domain — embedded Linux, k8s in constrained environments, edge deployments — which is harder to fake and serves as proof-of-depth for technical readers. Three to four posts a quarter is enough; specificity matters more than volume. No tutorials chasing keywords, only posts Vijo would actually want to write.

### Post-deploy checklist (do these once after the first successful deploy)

- [ ] Verify in **Google Search Console** at https://search.google.com/search-console — add as `sc-domain:vijocherian.com` property; verify via DNS TXT record. Until this is done, no SEO traffic data is observable for this site (and the workspace-wide `30 commercial sites with traffic` goal can't credit it).
- [ ] Submit the sitemap (`https://vijocherian.com/sitemap.xml`) inside GSC.
- [ ] Update the **Live URL** above with the actual deploy URL.
- [ ] Run `make run ARGS="cleanup"` from `sites/portfolio/` so `data/portfolio.json` reflects the new project's state (and `project status vijocherian.com` resolves cleanly).

## How to run

```bash
# from this dir, after `make buildsh` from sites/:
make deps      # → pnpm install via the central builder
make run       # → dev server
make build     # → dist/
make test      # → pnpm install + build + test (must be inside container)
```

## How this project is checked

This project is enforced against shared sites/* conventions by
`portfolio project check vijocherian.com` (run from `sites/portfolio/`).
Conformance is driven by the universal check catalog (CHECK_*) —
e.g. CHECK_020 (own-git-repo), CHECK_002 (has-ai-agents-md),
CHECK_007 (has-docs-prompts), CHECK_008 (has-docs-growth — `docs/growth.md`
exists — the per-project growth-experiment log; see Growth log section
below), CHECK_001 (has-readme), CHECK_009 (has-gitignore), CHECK_035
(vite-version-ok), CHECK_003 / CHECK_004 (AI_AGENTS.md `## Building info` +
`## Deployment info` headings). See the full catalog with
`portfolio check catalog`. The bootstrap output satisfies all of these on
day zero — keep it that way.

If `project check` flags a regression, fix it. v6.C's `portfolio project fix`
will eventually auto-fix; until then, hand-edit.

## Growth log — per-project experiment tracker

`docs/growth.md` is this project's append-only log of growth experiments
(content, SEO, marketing, structural changes). Each entry is a dated H2
with a measurable hypothesis + KPI + observation window (default 28d).
Read **the full workflow inside `docs/growth.md`** — it's self-sustaining
so you don't have to remember the lifecycle from outside the file.

Update it whenever you do something growth-relevant on this site. The
data source is GSC (`portfolio gsc sync` from the portfolio dir); this
file narrates *why*.

## Strategy reminder — ship fast, let the market decide

This sites/* workspace is shipping commercial sites toward a
**30-site SEO-traffic goal**. The convention is **build & ship fast,
then let GSC data drive what to invest more in.** Don't over-polish
before launch. Get a minimum-viable version live, indexed, then
iterate on whichever sites actually attract traffic.

Translation for this project: prefer shipping over perfection. The
SEO baseline files (`public/robots.txt`, `public/sitemap.xml`),
deploy config, and dev tooling (`vitest`) are pre-scaffolded so you
can ship today.

## Versioning

This project follows the sites/* **canonical versioning convention** (defined
in `sites/portfolio/AI_AGENTS.md`):

- **`vN`** — major capability tier. Each is a coherent shipped capability and
  may break compat with the previous tier. SemVer-MAJOR semantics.
- **`vN.X`** — phase letter within a tier (A / B / C / …). Internal slicing of
  build work; signals "order/scope can shift." Each phase still ships
  independently.
- **`vN.X.Y`** — numeric sub-phase for follow-up work that lands AFTER `vN.X`
  shipped (e.g. polish, bug fixes, scope cuts).

Two-layer notation separates **external version** (what consumers see) from
**internal phasing** (how the team slices work). Letters signal *un-promised* —
nobody mistakes `v1.B` for a SemVer minor release.

**Always use this numbering when planning or shipping work on this project.**
Specifically:

- Every entry in `docs/prd.md`'s phases table uses `vN.X` (or `vN.X.Y`).
- Every commit message that ships a phase mentions its version (e.g.
  `v1.B — auth flow`).
- Every entry in `docs/Prompts.md` references the version of the work it
  describes when relevant.

Don't introduce a parallel scheme (no `0.1.0` / `Sprint 3` / etc.). When in
doubt, the canonical statement is `sites/portfolio/AI_AGENTS.md`.

Track this project's progress in `docs/prd.md` against this taxonomy. v0.A is
the bootstrap (this scaffold); v1.A is the first real shipped capability.

## Conventions

- Stack: astro
- **Package manager: pnpm only.** No `bun.lockb`, no `package-lock.json`, no `yarn.lock` — they cause CF Pages to pick the wrong manager and break the build. The `pnpm-lock.yaml` is the only lockfile that should ever be committed.
- Build path: this project's `Makefile` → `../Makefile` → `~/work/projects/builder/`
- Cloudflare deploy constraints: Vite ≥ 6, frozen-lockfile install, no `_redirects` SPA fallback (handled by `wrangler.jsonc`'s `not_found_handling` instead).
- **Versioning**: two-level `vN` / `vN.X` — see Versioning section above and `sites/portfolio/AI_AGENTS.md` for the canonical statement.

## Out of scope / don't touch

- *(leave blank — fill in when something is)*
