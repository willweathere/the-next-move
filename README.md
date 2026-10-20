# The Next Move — personal portfolio

A minimal, chess-inspired personal portfolio for a Year 10 student. *Every move tells a story.*

Single-page site: hero chessboard, introduction with statistics, chess, football, refereeing, swimming, Duke of Edinburgh Bronze, published writing, education and an interactive transferable-skills list.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion. No backend, no database, no 3D.

```bash
npm install
npm run dev       # local development
npm run build     # production build to dist/
npm run preview   # serve the production build
```

## Deploying to Netlify

`netlify.toml` already sets the build command (`npm run build`) and publish directory (`dist`). Connect the repository to Netlify, or drag the `dist/` folder onto the Netlify dashboard. `public/_redirects` keeps deep links working.

## Editing content

All copy lives in the section components under `src/sections/`. Each section is one file:

| Section | File |
| --- | --- |
| Hero and chessboard | `src/sections/Hero.tsx`, `src/components/Chessboard.tsx` |
| About and statistics | `src/sections/Intro.tsx` |
| Chess | `src/sections/Chess.tsx` |
| Football | `src/sections/Football.tsx` |
| Refereeing | `src/sections/Refereeing.tsx` |
| Swimming | `src/sections/Swimming.tsx` |
| Duke of Edinburgh | `src/sections/DofE.tsx` |
| Published writing | `src/sections/Writing.tsx` |
| Education | `src/sections/Education.tsx` |
| Transferable skills | `src/sections/Skills.tsx` |

The four interactive squares on the hero board are listed in `HOT` at the top of `src/components/Chessboard.tsx`.

Colours, fonts and shared primitives are in `src/index.css` (`@theme` block). The accent is a muted lime (`--color-lime`).

## Imagery

- The swimming photograph is **"Swimming pool with lane ropes in place"** from Wikimedia Commons, licensed **CC BY 2.0**. Keep the attribution in the figure caption (or in a credits line) if the photo stays. Source: https://commons.wikimedia.org/wiki/File:Swimming_pool_with_lane_ropes_in_place.jpg
- The football pitch, chessboards, knight, referee badge, book and subject icons are original SVG/CSS illustrations.
- If an authentic *Poetry Escape* cover becomes available, drop it into `public/img/` and replace the CSS book in `src/sections/Writing.tsx` with an `<img>`.

## Accessibility and motion

All content is visible without JavaScript-driven animation, the chessboard squares are keyboard-focusable links, the skills list is a tab list, and every animation is disabled under `prefers-reduced-motion`.

## Facts

Only the supplied facts are used. Nothing about dates, grades, results, ratings or publication details has been added. Update the copy here before publishing if any detail changes.
