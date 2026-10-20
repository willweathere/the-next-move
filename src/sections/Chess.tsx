import { useState } from 'react'
import { useDetail } from '../components/Detail'
import { Reveal } from '../components/motion'
import { Open } from '../components/Detail'

/* A monochrome 6×6 board as a graphic object: hovering or focusing a square
   lifts it, and three marked squares stand for the three Gigafinal
   qualifications. */

const MARKED: Record<number, string> = { 9: 'Gigafinal · 1', 16: 'Gigafinal · 2', 23: 'Gigafinal · 3' }

export default function Chess() {
  const [hover, setHover] = useState<number | null>(null)
  const { open: openDetail } = useDetail()
  const squares = Array.from({ length: 36 }, (_, i) => i)

  return (
    <section id="chess" className="section bg-paper-2">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Chess</p>
              <h2 className="display mt-5">Think beyond<br />the next move.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[52ch] text-[1.1rem] leading-relaxed text-ink-2">
                I play in chess tournaments, have qualified for the Gigafinal three times, and have played for Surrey County in the U1450 category. Chess rewards the habits I value most: thinking ahead, staying patient, and making a decision when it counts.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              {([['Strategic thinking', 'theme-strategic'], ['Concentration', 'theme-concentration'], ['Patience', 'theme-patience'], ['Decision-making', 'theme-decision']] as const).map(([t, id]) => (
                <Open key={t} id={id} className="group" label={`${t}. Open details`}>
                  <span className="block h-px w-8 bg-ink transition-all duration-500 group-hover:w-14 group-hover:bg-lime-deep" aria-hidden="true" />
                  <p className="mt-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">{t}</p>
                </Open>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Gigafinal qualifications</p>
                <div className="mt-3 flex items-center gap-3" aria-label="Three qualifications">
                  {[1, 2, 3].map((n) => (
                    <Open key={n} id={`gigafinal-${n}`} className="grid h-11 w-11 place-items-center border border-ink font-serif text-lg transition-colors hover:bg-ink hover:text-paper" label={`Gigafinal qualification ${n}. Open details`}>{n}</Open>
                  ))}
                </div>
              </div>
              <Open id="surrey-county" className="group border-l-2 border-lime pl-5 transition-colors hover:border-ink" label="Surrey County U1450. Open details">
                <p className="eyebrow">County</p>
                <p className="mt-1 font-serif text-2xl">Surrey County · U1450</p>
              </Open>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative lg:pt-6">
            <div className="relative mx-auto max-w-[520px]">
              <div className="grid grid-cols-6 border border-ink" role="img" aria-label="A six-by-six chessboard graphic. Three marked squares represent three Gigafinal qualifications.">
                {squares.map((i) => {
                  const dark = (Math.floor(i / 6) + i) % 2 === 1
                  const mark = MARKED[i]
                  const lifted = hover === i
                  return (
                    <div
                      key={i}
                      role={mark ? 'button' : undefined}
                      onClick={mark ? () => openDetail(`gigafinal-${i === 9 ? 1 : i === 16 ? 2 : 3}`) : undefined}
                      onKeyDown={mark ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(`gigafinal-${i === 9 ? 1 : i === 16 ? 2 : 3}`) } } : undefined}
                      aria-label={mark ? `${mark}. Open details` : undefined}
                      tabIndex={mark ? 0 : -1}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      className={`relative aspect-square transition-transform duration-500 ${dark ? 'bg-ink' : 'bg-ivory'} ${mark ? 'cursor-pointer' : ''} ${lifted ? 'z-10 scale-[1.06] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]' : ''}`}
                    >
                      {mark && (
                        <>
                          <span className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${lifted ? 'bg-lime' : dark ? 'bg-paper' : 'bg-ink'}`} aria-hidden="true" />
                          <span className={`pointer-events-none absolute bottom-1.5 left-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] transition-opacity duration-300 sm:text-[0.62rem] ${dark ? 'text-paper' : 'text-ink'} ${lifted ? 'opacity-100' : 'opacity-0'}`}>
                            {mark}
                          </span>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
              <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-mute">Select a marked square</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
