import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from '../components/motion'
import { Open } from '../components/Detail'

const PARTS = [
  {
    k: 'Volunteering',
    v: 'Helping coach younger children.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true"><circle cx="18" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="32" cy="18" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8 38c0-8 4-13 10-13s10 5 10 13M26 38c0-6 2-10 6-10s6 4 6 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    k: 'Skills',
    v: 'Chess.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true"><path d="M16 40c0-10 3-15 8-19-2-1-3-5-1-7l3-5c1 1 3 2 5 3 5 2 7 8 7 13 0 7-2 10-3 15z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 40h22v3H14z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
    ),
  },
  {
    k: 'Physical',
    v: 'Football.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M24 14l6 4-2 7h-8l-2-7zM18 25l-6 3M30 25l6 3M24 34v5M14 16l-3-4M34 16l3-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" /></svg>
    ),
  },
]

export default function DofE() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <section id="dofe" className="section bg-paper-2">
      <div className="wrap">
        <Reveal className="max-w-[900px]">
          <p className="eyebrow">Duke of Edinburgh · Bronze</p>
          <h2 className="display mt-5">Progress is built<br />through commitment.</h2>
          <p className="mt-8 max-w-[56ch] text-[1.1rem] leading-relaxed text-ink-2">
            My Bronze Duke of Edinburgh's Award experience draws on three parts of this portfolio: volunteering by helping to coach younger children, chess for the skills section and football for the physical section.
          </p>
        </Reveal>

        <div ref={ref} className={`relative mt-16 ${inView ? 'in-view' : ''}`}>
          {/* The route line that connects the three parts */}
          <svg className="pointer-events-none absolute left-0 top-10 hidden h-[2px] w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <line className="draw" x1="0" y1="1" x2="100" y2="1" stroke="#b4c968" strokeWidth="2" pathLength="1" />
          </svg>
          <svg className="pointer-events-none absolute left-5 top-0 h-full w-[2px] md:hidden" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line className="draw" x1="1" y1="0" x2="1" y2="100" stroke="#b4c968" strokeWidth="2" pathLength="1" />
          </svg>

          <ol className="grid grid-cols-1 gap-0 md:grid-cols-3">
            {PARTS.map((p, i) => (
              <Reveal key={p.k} as="li" delay={i * 0.12} className="relative pl-14 pb-12 md:pb-0 md:pl-0 md:pr-10">
                <span className="absolute left-[14px] top-[34px] h-3 w-3 -translate-x-1/2 bg-ink md:left-0 md:top-[34px] md:translate-x-0" aria-hidden="true" />
                <Open id={`dofe-${p.k.toLowerCase()}`} className="group block text-ink md:pt-16" label={`${p.k}: ${p.v} Open details`}>
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1">{p.icon}</span>
                  <p className="eyebrow mt-5">{p.k}</p>
                  <p className="mt-2 font-serif text-[2rem] leading-tight">{p.v}</p>
                  <span className="mt-3 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-mute transition-colors group-hover:text-ink">Open &rarr;</span>
                </Open>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
