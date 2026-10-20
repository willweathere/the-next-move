import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChapterHead, MaskLines, Reveal, useShown } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'

function Count({ to }: { to: number }) {
  const [ref, inView] = useShown<HTMLSpanElement>()
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])
  return <span ref={ref} className="t-num">{n}</span>
}

const STATS = [
  { n: 4, unit: 'Years', label: 'Swimming helper.', id: 'stat-swimming' },
  { n: 3, unit: 'Times', label: 'Qualified for the Chess Gigafinal.', id: 'stat-gigafinal' },
  { n: 2, unit: 'Teams', label: 'Saturday and Sunday football.', id: 'stat-teams' },
]

export default function Intro() {
  const c = chapter('about')
  return (
    <section id="about" className="section bg-paper">
      <div className="wrap">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <MaskLines className="t-display" lines={['More than', 'the game.']} />
          <Reveal delay={0.1} className="lg:pt-4">
            <p className="t-lead measure text-ink">
              From competitive football and chess tournaments to refereeing, volunteering and published writing, I enjoy developing new skills, taking on challenges and working towards long-term goals.
            </p>
            <p className="measure mt-5 text-ink-2">
              This portfolio collects what I have done so far and what each experience has taught me. The pieces are different; the habits behind them are the same.
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 grid grid-cols-1 border-t border-ink sm:mt-24 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.1} className="border-b border-line sm:border-b-0 sm:border-r sm:last:border-r-0">
              <Open id={s.id} className="group relative block w-full py-8 sm:px-8 sm:py-10 sm:first:pl-0" label={`${s.n} ${s.unit.toLowerCase()}: ${s.label} Open details`}>
                <span className="flex items-end gap-4">
                  <span className="font-serif text-[clamp(5rem,9.5vw,8.5rem)] leading-[0.8] tracking-[-0.03em]"><Count to={s.n} /></span>
                  <span className="t-label mb-2 text-mute">{s.unit}</span>
                </span>
                <span className="mt-6 block text-[1.02rem] text-ink-2">{s.label}</span>
                <span className="t-label mt-5 flex items-center gap-2 text-mute transition-colors group-hover:text-ink">
                  More
                  <svg className="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                </span>
              </Open>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 sm:mt-16">
          <div className="flex flex-col gap-6 bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <Open id="level-6" className="on-dark group flex items-center gap-6" label="Qualified Level 6 football referee. Open details">
              <span className="grid h-16 w-16 shrink-0 place-items-center border border-paper/40 font-serif text-3xl transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink" aria-hidden="true">6</span>
              <span>
                <span className="t-label block text-paper/50">Qualified</span>
                <span className="mt-1 block font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-tight">Level 6 football referee</span>
              </span>
            </Open>
            <a href="#refereeing" className="on-dark link-line t-label inline-flex min-h-11 items-center self-start text-paper/70 hover:text-paper sm:self-auto">Read about refereeing</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
