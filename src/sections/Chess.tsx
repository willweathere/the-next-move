import { useState } from 'react'
import { ChapterHead, MaskLines, Reveal, useShown } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'

/* A flat monochrome board as a graphic object. Three marked squares stand
   for the three Gigafinal qualifications: they light in sequence when the
   section arrives, lift on hover, and open their own detail page. */

const MARKS: Record<number, { n: number; numeral: string }> = { 14: { n: 1, numeral: 'I' }, 21: { n: 2, numeral: 'II' }, 28: { n: 3, numeral: 'III' } }
const THEMES = [
  ['Strategic thinking', 'theme-strategic'],
  ['Concentration', 'theme-concentration'],
  ['Patience', 'theme-patience'],
  ['Decision-making', 'theme-decision'],
] as const

export default function Chess() {
  const c = chapter('chess')
  const [hover, setHover] = useState<number | null>(null)
  const [boardRef, shown] = useShown<HTMLDivElement>('0px 0px -20% 0px')
  const squares = Array.from({ length: 36 }, (_, i) => i)

  return (
    <section id="chess" className="section bg-paper">
      <div className="wrap">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <MaskLines className="t-display" lines={['Think beyond', 'the next move.']} />
            <Reveal delay={0.1}>
              <p className="t-lead measure mt-8 text-ink-2">
                I play in chess tournaments, have qualified for the Gigafinal three times, and have played for Surrey County in the U1450 category. Chess rewards the habits I value most: thinking ahead, staying patient, and making a decision when it counts.
              </p>
            </Reveal>

            <Reveal delay={0.15} as="ul" className="mt-12 grid grid-cols-2 border-t border-line">
              {THEMES.map(([t, id], i) => (
                <li key={id} className={`border-b border-line ${i % 2 === 0 ? 'border-r pr-4' : 'pl-5'}`}>
                  <Open id={id} className="group flex w-full items-center justify-between gap-3 py-5" label={`${t}. Open details`}>
                    <span className="text-[0.95rem] font-semibold">{t}</span>
                    <span className="h-2 w-2 shrink-0 border border-ink transition-colors duration-300 group-hover:bg-lime-deep group-hover:border-lime-deep" aria-hidden="true" />
                  </Open>
                </li>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <Open id="surrey-county" className="group flex w-full items-center justify-between gap-6 border border-ink p-6 transition-colors duration-300 hover:bg-ink hover:text-paper" label="Surrey County, U1450. Open details">
                <span>
                  <span className="t-label block text-mute group-hover:text-paper/60">County</span>
                  <span className="mt-1 block font-serif text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight">Surrey County <span className="text-mute group-hover:text-paper/60">&middot;</span> U1450</span>
                </span>
                <svg className="h-3 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </Open>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <div ref={boardRef} className="mx-auto max-w-[520px]">
              <div className="grid grid-cols-6 border border-ink bg-ink p-[3px]" role="group" aria-label="Board graphic. Three marked squares stand for three Gigafinal qualifications.">
                {squares.map((i) => {
                  const dark = (Math.floor(i / 6) + i) % 2 === 1
                  const mark = MARKS[i]
                  const base = `relative aspect-square ${dark ? 'bg-ink' : 'bg-ivory'}`
                  if (!mark) return <div key={i} className={base} aria-hidden="true" />
                  const lifted = hover === i
                  return (
                    <Open
                      key={i}
                      id={`gigafinal-${mark.n}`}
                      label={`Gigafinal qualification ${mark.n}. Open details`}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      className={`${base} z-0 transition-[transform,box-shadow] duration-500 ${lifted ? 'z-10 -translate-y-1.5 shadow-[0_18px_30px_-16px_rgba(0,0,0,0.55)]' : ''}`}
                    >
                      <span className="absolute inset-0 grid place-items-center">
                        <span
                          className={`absolute inset-[14%] transition-colors duration-700 ${shown ? 'bg-lime' : dark ? 'bg-paper/10' : 'bg-ink/5'}`}
                          style={{ transitionDelay: shown ? `${0.3 + mark.n * 0.35}s` : '0s' }}
                          aria-hidden="true"
                        />
                        <span className="relative font-serif text-[clamp(1.2rem,2.6vw,1.8rem)] text-ink" aria-hidden="true">{mark.numeral}</span>
                      </span>
                    </Open>
                  )
                })}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="t-label text-mute">Gigafinal qualifications</p>
                <div className="flex gap-2">
                  {[1, 2, 3].map((n) => (
                    <Open key={n} id={`gigafinal-${n}`} label={`Gigafinal qualification ${n}. Open details`} className="grid h-11 w-11 place-items-center border border-line font-serif text-lg transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper">
                      {['I', 'II', 'III'][n - 1]}
                    </Open>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
