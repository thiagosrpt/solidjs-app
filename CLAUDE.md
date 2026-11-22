# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: runs the Tailwind CLI watcher (`src/index.css` → `src/output.css`) and Vite on http://localhost:3000 in parallel. Use this, not `npm start`, which runs only Vite.
- `npm run build`: runs a production build into `dist/`. It does **not** run Tailwind, so regenerate `src/output.css` first if any classes changed.
- `npm run serve`: previews the production build.
- Rebuild the CSS by hand with `./node_modules/.bin/tailwindcss -i ./src/index.css -o ./src/output.css`. The `--watch` process sometimes fails to pick up edits, and `npx tailwindcss` can hang in sandboxed shells.

The project has no test suite or linter.

## Architecture

A single-page SolidJS app (Vite 5, `vite-plugin-solid`, Tailwind 3). The UI is a horizontal, category-filtered image carousel. Almost all of the logic is in `src/App.jsx`.

**Styling pipeline:** Tailwind isn't a PostCSS/Vite plugin here. The CLI compiles `src/index.css` into `src/output.css`, which is committed and linked directly from `index.html`. If a class doesn't appear in the browser, the usual cause is a stale `output.css`. Dark mode uses `darkMode: 'class'` on `<html>`. An inline script in `index.html` applies the saved or system theme before first paint, and `App.jsx` reads that initial state and keeps it in sync, saving to `localStorage` under the key `theme`.

**Data model (`src/assets/slide-data.js`):** `slides` is an array of arrays. Each inner array is one carousel slide, and it holds one entry per category (currently `Explore` and `Stories`). Every entry in a slide renders stacked (`absolute inset-0`), and only the entry matching `currentCategory` is visible, so changing category is an opacity crossfade, not a re-render. The category buttons come from the unique `category` values. Slide DOM ids are index-based (`slide-${index}`), so inserting a slide shifts every later id. Images are Picsum seed URLs; `src/assets/images/` isn't referenced by the app.

**Carousel animation (`src/App.jsx`):** these parts depend on each other:
- `SLIDE_DURATION` (800) must match the slide's `duration-[800ms]` class.
- Clicking a slide (`expandSlide`) scrolls it to the center first (`goTo` → `scrollIntoView`). It expands only after scrolling settles (`scrollend`, with a 120ms debounced `scroll` fallback, within a 2px `CENTER_TOLERANCE`). If another slide is open, that one collapses first, and the move to the new slide follows after `SLIDE_DURATION`.
- While a slide's width animates (300px ↔ `w-full`, capped at 1038px), `keepCentered` runs a `requestAnimationFrame` loop that adjusts `scrollLeft` on every frame so the slide grows evenly from its center. During that loop the `resizing` signal swaps `snap-mandatory scroll-smooth` for `snap-none`, which stops scroll-snap from fighting the loop. Any new scroll must cancel `rafId` first.
- The `<img>` is fixed at the expanded size (`w-[1038px]`, centered with `left-1/2 -translate-x-1/2`), so widening the slide reveals more of the image instead of rescaling it.
- Child elements react through Tailwind arbitrary group variants: `group-[.is-expanded]:…`, set on the open slide, and `group-[.is-category]:…`, set on the visible category layer. Only `transform` and `opacity` are animated on children.
- The end spacers (`w-[calc(50%-158px)]`) let a *closed* 300px slide reach the center. An open first or last slide can't fully center.
- The custom easing `ease-soft` is defined in `tailwind.config.js`. Every animated element also has `motion-reduce:transition-none`.

`solid-devtools` is installed but disabled. To turn it on, uncomment it in `vite.config.js`.

## Working in this repo

- **Check visual changes in the browser.** The build passing doesn't prove an animation looks right. Load http://localhost:3000, then test opening a slide, switching from one open slide to another, closing, and changing category, in both light and dark mode. If `npm run dev` is already running, reuse it.
- **Regenerate `src/output.css` before committing** any change that adds or changes Tailwind classes. The committed CSS is what the page uses.
- **Animation changes:** animate only `transform`/`opacity` on child elements and `width` on the slide. Keep `SLIDE_DURATION` in sync with the duration class. Keep `motion-reduce:transition-none` on anything new that animates. Don't bring back the strict `=== 0` centering check or a layout-property keyframe (`top`/`bottom`/`height`); both caused visible jumps before.
- **Slide content:** the image `alt` text comes from `title`, and the file header in `slide-data.js` says each title and description match the photo. New entries need text that describes their image and an entry for every category. Add new slides at the end unless asked otherwise, so existing `slide-N` ids don't change.
- **Git:** work happens directly on `main`, and pushes go to `origin/main`. Commit or push only when asked. Commit messages are short, imperative summaries (for example, "Smooth out slide expand, switch, and category animations").

## Personal preferences

<!-- Fill these in; delete any you don't need. -->

- **Communication style:** <!-- e.g. brief answers vs. detailed explanations; plain language vs. technical -->
- **Before making changes:** <!-- e.g. always show a plan first / just do it for small changes -->
- **Code style:** <!-- e.g. formatting, naming, comment density, Tailwind class ordering -->
- **Design taste:** <!-- e.g. preferred animation feel, colors, spacing, fonts -->
- **Placeholder content:** <!-- e.g. image source to use, tone of sample copy -->
- **Git workflow:** <!-- e.g. commit message format, branch vs. main, auto-push or not -->
- **Testing/verification:** <!-- e.g. always check in browser, record a GIF, screen sizes to check -->
- **Other:** <!-- anything else Claude should always or never do -->
