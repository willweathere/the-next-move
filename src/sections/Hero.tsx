import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import Board3D from '../components/Board3D'
import { MaskLines, EASE, DUR } from '../components/motion'
import { CHAPTERS } from '../content'

export default function Hero() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)
  const cur = CHAPTERS.find((c) => c.id === active)
  const late = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: DUR.base, ease: EASE, delay: d } })

  return (
    <section id="top" data-nav="dark" className="on-dark grain grain--dark relative overflow-hidden bg-ink text-paper">
      {/* One soft pool of light behind the board, and a faint board texture at the edge */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[80%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(245,244,240,0.07),transparent)]" aria-hidden="true" />
      <div className="checker pointer-events-none absolute inset-y-0 right-0 hidden w-[9%] opacity-60 lg:block" style={{ ['--c' as string]: 'rgba(245,244,240,0.04)', ['--s' as string]: '72px' }} aria-hidden="true" />

      <div className="wrap relative grid min-h-[100svh] grid-cols-1 items-center gap-6 px-[var(--gutter)] pb-14 pt-[calc(var(--nav-h)+2.5rem)] lg:grid-cols-[1fr_1.12fr] lg:gap-6 lg:pb-16">
        <div className="relative z-10 max-w-[620px]">
          <m.p className="t-label text-paper/55" {...late(0.05)}>Personal portfolio</m.p>
          <MaskLines
            as="h1"
            immediate
            delay={0.08}
            className="t-hero mt-6 sm:mt-8"
            lines={['THE NEXT', <span key="m" className="text-lime">MOVE.</span>]}
          />
          <m.p className="mt-9 font-serif text-[clamp(1.55rem,2.5vw,2.1rem)] italic leading-tight text-paper/90 sm:mt-10" {...late(0.45)}>
            Every move tells a story.
          </m.p>
          <m.p className="t-lead mt-4 max-w-[44ch] text-paper/65" {...late(0.55)}>
            Leadership, strategy, discipline and creativity &mdash; demonstrated through sport, competition, volunteering and writing.
          </m.p>
          <m.div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" {...late(0.65)}>
            <a href="#about" className="btn btn--light">
              Explore the portfolio
              <svg className="arrow h-3 w-5" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </a>
            <a href="#skills" className="link-line t-label inline-flex min-h-11 items-center text-paper/60 hover:text-paper">Skip to the skills</a>
          </m.div>
        </div>

        <div className="relative mx-auto w-full max-w-[620px] lg:-mr-6 lg:max-w-none">
          <Board3D active={active} onActive={setActive} />

          {/* Readout: the same information as hover, always visible and announced politely */}
          <m.div className="mx-auto mt-2 max-w-[520px] border-t border-paper/15 pt-4" {...late(1.1)}>
            <p className="flex min-h-[3.2rem] items-baseline gap-4" aria-live="polite">
              {cur ? (
                <>
                  <span className="t-label t-num text-lime">{cur.n} / {cur.square}</span>
                  <span className="font-serif text-[1.35rem] leading-snug text-paper">{cur.label}. <span className="italic text-paper/60">{cur.title}</span></span>
                </>
              ) : (
                <>
                  <span className="t-label text-paper/45">Route</span>
                  <span className="font-serif text-[1.35rem] leading-snug text-paper/70">Nine chapters, linked by a knight&rsquo;s moves. Choose a square.</span>
                </>
              )}
            </p>
            <nav aria-label="Chapters" className="mt-3">
              <ol className="grid grid-cols-3 gap-x-4 gap-y-1">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      onMouseEnter={() => setActive(c.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(c.id)}
                      onBlur={() => setActive(null)}
                      className={`group flex min-h-[2.25rem] items-center gap-2.5 text-[0.82rem] transition-colors duration-300 ${active === c.id ? 'text-paper' : 'text-paper/55 hover:text-paper'}`}
                    >
                      <span className={`t-num text-[0.68rem] font-semibold tracking-[0.12em] transition-colors ${active === c.id ? 'text-lime' : 'text-paper/35'}`}>{c.n}</span>
                      {c.short}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </m.div>
        </div>
      </div>
    </section>
  )
}
