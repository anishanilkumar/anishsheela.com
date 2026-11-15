# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio site for Anish Anilkumar (anishanilkumar.com). Built with React 18 + Vite + Tailwind CSS, deployed to GitHub Pages.

## Commands

- `npm run dev` — start the Vite dev server with hot reload
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run deploy` — build then publish `dist/` to GitHub Pages via `gh-pages` (runs `predeploy` automatically)

There is no test suite, linter, or type checker configured.

## Architecture

The entire site is a single component: `src/App.jsx` (`App`). It renders every section (hero, work timeline, stack, projects, education/languages, community, contact, footer) inline in one JSX return, plus a few small local helper components (`Eyebrow`, `SectionHead`, `Chip`).

- Page content (job history, skills, projects, education, certifications, languages, community) lives in plain JS arrays at the top of `App.jsx` (`headlineStats`, `experience`, `stack`, `projectGroups`, `education`, `certifications`, `languages`, `community`) and is `.map`ped into the markup. **Edit these arrays to update site content**, not the JSX.
- The page is built in two layers so a casual visitor can scan it: an always-visible layer (hero `headlineStats`, each project's `tagline`, each role's `headline` and `stats`) and the full text on demand. Keep the scanning layer able to stand on its own; most visitors never open the rest.
- Projects are a selector (`ProjectSelector`): an index of rows, and the selected project's panel (`ProjectPanel`). It is one DOM for both layouts, an accordion on phones and a two-column grid from `lg`; all panels stay in the prerendered HTML. The first project in `projectGroups` is selected on load.
- Work history shows each role's bullets inside a native `<details>`, open by default for the role marked `current`.
- Motion only answers the visitor: `.rise` for the hero entrance, `.arrive` for a panel or details being opened. No scroll-triggered or looping animation.
- Navigation is in-page anchors (`about`, `projects`, `work`, `stack`, `education`, `community`, `contact`), driven by the `nav` array. Keep the `nav` array and section `id`s in sync.
- Copy convention: no em dashes anywhere in site text (deliberate). En dashes are used only in numeric date ranges.
- Visual style is Anish's "instrument" house style (dark only, lineage: `~/projects/home/jarvis/frontend/src/styles/tokens.css`; load the `instrument-design` skill before UI changes). Token values are CSS variables at the top of `src/index.css`; `tailwind.config.js` maps them to Tailwind colors (`ground`, `panel`, `panel-lit`, `engrave`, `ink`, `ink-dim`, `arc`, `arc-dim`, `gold`, `slate`) and fonts (`font-data` Archivo, `font-mono` Plex Mono). `border-rule` is the 2px rule width; never use 1px hairlines, rounded cards, shadows, gradients or blur. Use these tokens rather than raw hex or default Tailwind grays.
- `src/index.css` also holds shared component classes (`.instrument` bracketed surface, `.label`, `.btn`, `.btn-primary`), the `.rise` hero entrance animation and reduced-motion handling.
- Fonts are self-hosted from `public/fonts/` (copied from Jarvis, see its README); no CDN fonts.
- `public/og.png`, `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` follow the same style; regenerate them if the palette changes.
- Icons come from `lucide-react` (used sparingly, only for the social row).
- `src/main.jsx` mounts `App` into `#root`; `index.html` is the Vite entry.

## Assets & deployment

- The resume PDF (`public/Anish_Anilkumar_CV.pdf`) is served from the site root at `/Anish_Anilkumar_CV.pdf` (Vite copies `public/` verbatim). It is the "web" variant built from the separate `~/projects/job_search/resume_new` Typst project (`dist/web/`). Replace the file in `public/` to update the downloadable resume; the copy in `dist/` here is a build artifact.
- `dist/` is gitignored and generated; never edit it by hand.
- Deployment targets the apex domain (`base: '/'` in `vite.config.js`), so asset paths are root-relative.
