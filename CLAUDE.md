# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview built dist/
npm run lint       # ESLint check
```

## Architecture

Single-page React app (Vite + React 19) — an animated anniversary invitation card for a 25th wedding anniversary celebration in Lucknow, July 2026.

**All application code lives in two files:**
- `src/App.jsx` — entire component tree and all data
- `src/App.css` — all styles, using CSS custom properties defined in `:root`

**Component tree (top-level render order in `App`):**
```
<App>
  sparkle-layer div        ← ambient animated sparkles (animejs)
  <FloralBg>               ← fixed SVG floral background, generated in useEffect
  <Hero>
    <HeroToran>            ← animated top decoration (mango leaves, marigold blooms, pendants)
  <BookCard>               ← flip-book UI for 3 events, uses refs for CSS-transition flipping
    <GarlandDivider>
  <TimelineSection>        ← alternating left/right timeline
    <PaisleyDivider>
  <DressSection>           ← dress code cards
  <VenueSection>           ← venue with Google Maps link
  <PhotosSection>          ← photo placeholder grid
  <FooterSection>
```

**Animation pattern:** Every section uses `IntersectionObserver` + `animejs` for scroll-reveal. The observer fires once (`obs.unobserve(el)` after trigger), then disconnects on component unmount.

**Data:** Event details (`EVENTS`, `TL_ITEMS`, `DRESS`) and the venue Google Maps URL (`MAPS_URL`) are module-level constants at the top of `App.jsx`. To change event dates, names, or descriptions, edit these constants.

**Design tokens:** All colors and theme values are CSS variables in `App.css` `:root`. The palette is kumkum red (`--primary`), peacock teal (`--teal`), temple brass gold (`--accent`), and saffron-tinted ivory (`--bg`/`--cream`).

**BookCard flip mechanics:** Uses direct DOM manipulation via `pageRefs` and CSS `rotateY` transitions (not React state for the actual flip animation), with `transitionend` listeners chained for multi-page steps. React state only tracks current page index and the `flipping` lock.

**Sparkles:** Two functions — `spawnSparkles` (ambient, random positions) called on interval in `App`, and `burstSparkles` (radial burst from a point) called after each book page flip.
