import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/motion'
import { Open } from '../components/Detail'

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const start = performance.now()
    const dur = 1100
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])
  return <span ref={ref}>{n}{suffix}</span>
}

const STATS = [
  { n: 4, unit: 'years', label: 'Swimming helper.', id: 'stat-swimming' },
  { n: 3, unit: 'times', label: 'Qualified for the Chess Gigafinal.', id: 'stat-gigafinal' },
  { n: 2, unit: 'teams', label: 'Saturday and Sunday football.', id: 'stat-teams' },
]

export default function Intro() {
  return (
    <section id="about" className="section bg-paper">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="display mt-5">More than<br />the game.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-14">
            <p className="max-w-[56ch] text-[1.15rem] leading-relaxed text-ink-2 sm:text-[1.25rem]">
              From competitive football and chess tournaments to refereeing, volunteering and published writing, I enjoy developing new skills, taking on challenges and working towards long-term goals.
            </p>
            <p className="mt-5 max-w-[56ch] text-ink-2/80">
              This portfolio collects what I have done so far and what each experience has taught me. The pieces are different; the habits behind them are the same.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.unit} delay={i * 0.1} className="border-b border-line sm:border-b-0 sm:border-r sm:last:border-r-0">
              <Open id={s.id} className="group block w-full py-9 transition-colors duration-300 hover:bg-paper-2 sm:px-8 sm:first:pl-0" label={`${s.n} ${s.unit}: ${s.label} Open details`}>
                <p className="font-serif text-[clamp(4rem,8vw,6.5rem)] leading-none tracking-tight">
                  <Count to={s.n} />
                  <span className="ml-3 align-middle text-[0.72rem] font-sans font-semibold uppercase tracking-[0.2em] text-mute">{s.unit}</span>
                </p>
                <p className="mt-3 text-ink-2">{s.label}</p>
                <span className="mt-3 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-mute transition-colors group-hover:text-ink">Open &rarr;</span>
              </Open>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Open id="level-6" className="group flex items-center gap-5" label="Level 6 football referee. Open details">
            <span className="grid h-12 w-12 place-items-center border border-ink font-serif text-xl transition-colors group-hover:bg-ink group-hover:text-paper" aria-hidden="true">6</span>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-mute">Qualified</p>
              <p className="font-serif text-2xl">Level 6 football referee</p>
            </div>
          </Open>
          <a href="#refereeing" className="link-line text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-ink-2">Read about refereeing</a>
        </Reveal>
      </div>
    </section>
  )
}
