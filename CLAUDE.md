# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio site for Anish Anilkumar (www.anishsheela.com). Built with React 18 + Vite + Tailwind CSS, deployed to GitHub Pages.

## Commands

- `npm run dev` — start the Vite dev server with hot reload
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run deploy` — build then publish `dist/` to GitHub Pages via `gh-pages` (runs `predeploy` automatically)

There is no test suite, linter, or type checker configured.

## Architecture

The entire site is a single component: `src/App.jsx` (`App`). It renders every section (hero, work timeline, stack, projects, education/languages, community, contact, footer) inline in one JSX return, plus a few small local helper components (`Eyebrow`, `SectionHead`, `Chip`).

- Page content (job history, skills, projects, education, certifications, languages, community) lives in plain JS arrays at the top of `App.jsx` (`experience`, `stack`, `projects`, `education`, `certifications`, `languages`, `community`) and is `.map`ped into the markup. **Edit these arrays to update site content**, not the JSX.
- Navigation uses in-page anchor scrolling: nav buttons call `scrollIntoView` against section `id`s (`about`, `work`, `stack`, `projects`, `contact`), driven by the `nav` array. Keep the `nav` array and section `id`s in sync.
- Copy convention: no em dashes anywhere in site text (deliberate). En dashes are used only in numeric date ranges.
- Design system lives in `tailwind.config.js` under `theme.extend`: custom colors (`paper`, `panel`, `ink`, `navy`, `route`, `muted`, `hair`) and font families (`font-display` Space Grotesk, `font-serif` Source Serif 4 for body prose, `font-mono` JetBrains Mono for dates/labels/chips). Use these tokens rather than raw hex or default Tailwind grays. `navy` (#1F3A5F) is carried over from the resume's accent color; `route` green is the accent.
- Fonts load from Google Fonts via `<link>` in `index.html`. Custom CSS (base body styles, the `.rise` hero entrance animation, reduced-motion handling) is in `src/index.css` alongside the `@tailwind` directives.
- Icons come from `lucide-react` (used sparingly, only for the social row).
- `src/main.jsx` mounts `App` into `#root`; `index.html` is the Vite entry.

## Assets & deployment

- The resume PDF (`public/Anish_Anilkumar_CV.pdf`) is served from the site root at `/Anish_Anilkumar_CV.pdf` (Vite copies `public/` verbatim). It is the "web" variant built from the separate `~/resume_new` Typst project (`dist/web/`). Replace the file in `public/` to update the downloadable resume; the copy in `dist/` here is a build artifact.
- `dist/` is gitignored and generated; never edit it by hand.
- Deployment targets the apex domain (`base: '/'` in `vite.config.js`), so asset paths are root-relative.
