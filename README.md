# The Next Move — personal portfolio

A chess-inspired personal portfolio for a Year 10 student. *Every move tells a story.*

The page reads as one annotated game. Each chapter is a numbered move with its own square on the hero board, and consecutive squares are a knight's move apart:

| Move | Square | Chapter | Part |
| --- | --- | --- | --- |
| 01 | b1 | About | Opening |
| 02 | c3 | Chess | I · Achievements |
| 03 | e4 | Refereeing | I · Achievements |
| 04 | g5 | Published writing | I · Achievements |
| 05 | f7 | Football | II · Experience |
| 06 | d6 | Swimming | II · Experience |
| 07 | b7 | Duke of Edinburgh | II · Experience |
| 08 | a5 | Education | Learning |
| 09 | c4 | Transferable skills | Learning |

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion (loaded through `LazyMotion`). Fonts are self-hosted through Fontsource (Instrument Serif, Manrope). No backend and no WebGL: the two 3D pieces, the hero board and the book, are plain CSS 3D transforms.

```bash
npm install
npm run dev       # local development
npm run build     # type-check and production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Deploying to Netlify

`netlify.toml` sets the build command, the publish folder (`dist`), Node 22, long-lived caching for hashed assets and a few security headers. Netlify's build-time `URL` variable is written into the canonical link and the social-card image address by a small plugin in `vite.config.ts`. `public/_redirects` keeps deep links working.

Connect the GitHub repository in Netlify (Add new site, Import an existing project) and every push to `main` deploys.

## Where things live

| What | File |
| --- | --- |
| Chapter list, numbers, squares, nav items | `src/content.ts` |
| Design tokens, type scale, buttons, 3D board and book CSS | `src/index.css` |
| Motion system: reveals, masked headlines, image reveals, chapter heads | `src/components/motion.tsx` |
| Hero and the 3D board | `src/sections/Hero.tsx`, `src/components/Board3D.tsx` |
| Navigation, reading progress, mobile menu | `src/components/Nav.tsx` |
| Scoresheet rail (wide screens) | `src/components/Rail.tsx` |
| Part openers (Achievements, Experience) | `src/components/PartOpener.tsx` |
| Detail sheets ("little pages") and their text | `src/components/Detail.tsx` |
| Chapters | `src/sections/*.tsx` |
| Closing, index and credits | `src/sections/Closing.tsx` |

To move a chapter or rename it, change `src/content.ts`; the board, rail, part openers, mobile menu and footer index all read from it. If you change a board square, keep each square a knight's move from the one before so the route stays legal.

## Imagery

- Football: "Adidas soccer ball on a grass pitch" by Peter Glaser, CC0, via Wikimedia Commons (from Unsplash). Converted to black and white and cropped.
- Swimming: "Swimming pool with lane ropes in place" by Xander, CC BY 2.0, via Wikimedia Commons. Converted to black and white. Keep the credit in the caption and footer while the photo is used.
- Both are captioned as illustrative photographs; neither shows the student or the student's teams.
- The boards, book, badge and icons are original CSS and SVG illustrations. The book is labelled as an illustration, not the published cover. If an authentic *Poetry Escape* cover becomes available, it can replace the CSS cover in `src/sections/Writing.tsx`.

Source images live in `src/assets/img/` as WebP and JPEG at several widths, served through `<picture>` with `srcset`.

## Accessibility and motion

- Every block on the 3D board is a real link with a name; a readout and a legend give the same information without hover.
- Detail sheets trap focus, close on Escape or the backdrop, and return focus to what opened them.
- The skills list follows the WAI-ARIA tabs pattern: one tab stop, arrow keys, Home and End.
- Under `prefers-reduced-motion` the board is shown fully built, nothing tilts, reveals are instant and the ripples stop.

## Facts

Only the supplied facts are used. Nothing about dates, grades, results, ratings, awards or publication details has been added. No contact details are published. Update the copy here before publishing if any detail changes.
