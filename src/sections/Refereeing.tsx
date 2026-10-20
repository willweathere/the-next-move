import { ChapterHead, MaskLines, Reveal, useShown } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'

const PRINCIPLES = [
  { n: '01', title: 'Understand the rules.', text: 'Knowing the laws of the game well enough to apply them without hesitation.' },
  { n: '02', title: 'Communicate clearly.', text: 'Players, coaches and parents all need to understand a decision the moment it is made.' },
  { n: '03', title: 'Make informed decisions.', text: 'Seeing the whole picture, deciding, and standing by it under pressure.' },
]

function Badge() {
  return (
    <svg viewBox="0 0 120 140" className="h-32 w-28 sm:h-40 sm:w-36" aria-hidden="true">
      <path d="M60 6 108 24v44c0 30-20 52-48 64C32 120 12 98 12 68V24z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M60 22 94 35v33c0 22-15 38-34 47-19-9-34-25-34-47V35z" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" />
      <text x="60" y="80" textAnchor="middle" fontFamily="Instrument Serif, Georgia, serif" fontSize="44" fill="currentColor">6</text>
      <text x="60" y="100" textAnchor="middle" fontFamily="Manrope Variable, Manrope, system-ui, sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="2.6" fill="currentColor">REFEREE</text>
    </svg>
  )
}

export default function Refereeing() {
  const c = chapter('refereeing')
  const [ref, shown] = useShown<HTMLDivElement>('0px 0px -10% 0px')
  return (
    <section id="refereeing" data-nav="dark" className="on-dark grain grain--dark section relative overflow-hidden bg-ink text-paper">
      {/* Thin pitch markings, drawn in as the chapter arrives */}
      <div ref={ref} className={`pointer-events-none absolute inset-0 ${shown ? 'in-view' : ''}`} aria-hidden="true">
        <svg className="absolute right-0 top-0 h-full w-full opacity-[0.14] lg:w-[62%]" viewBox="0 0 700 700" preserveAspectRatio="xMaxYMid slice">
          <g fill="none" stroke="#f5f4f0" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <circle className="draw" pathLength={1} cx="420" cy="300" r="170" vectorEffect="non-scaling-stroke" />
            <circle cx="420" cy="300" r="3" fill="#f5f4f0" />
            <line className="draw" pathLength={1} x1="420" y1="0" x2="420" y2="700" vectorEffect="non-scaling-stroke" style={{ ['--d' as string]: '0.4s' }} />
          </g>
        </svg>
      </div>

      <div className="wrap relative">
        <ChapterHead n={c.n} square={c.square} label={c.label} dark />
        <div className="mt-10 grid grid-cols-1 items-end gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <MaskLines className="t-display" lines={['Clarity', 'under pressure.']} />
            <Reveal delay={0.1}>
              <p className="t-lead measure mt-8 text-paper/70">
                As a qualified Level 6 referee I am responsible for a game from the first whistle to the last. It has taught me to know the rules, explain decisions clearly and make them with confidence.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:justify-self-end">
            <Open id="level-6" label="Level 6 referee. Open details" className="group flex items-center gap-6 sm:gap-8">
              <span className="text-paper transition-colors duration-500 group-hover:text-lime"><Badge /></span>
              <span>
                <span className="t-label block text-paper/50">Qualification</span>
                <span className="mt-1 block font-serif text-[clamp(4.6rem,10vw,9rem)] leading-[0.82] tracking-[-0.03em]">
                  Level <span className="text-lime">6</span>
                </span>
              </span>
            </Open>
          </Reveal>
        </div>

        <ol className="mt-20 grid grid-cols-1 border-t border-paper/20 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 0.1} className="border-b border-paper/15 md:border-b-0 md:border-r md:last:border-r-0">
              <Open id={`principle-${i + 1}`} className="group relative block h-full w-full py-9 transition-colors duration-500 md:px-8 md:first:pl-0 md:hover:bg-paper/[0.03]" label={`${p.n}, ${p.title} Open details`}>
                <span className="absolute left-0 top-[-1px] h-px w-0 bg-lime transition-all duration-700 group-hover:w-full md:group-first:left-0" aria-hidden="true" />
                <span className="t-num block font-serif text-2xl text-lime">{p.n}</span>
                <span className="mt-6 block text-[1.45rem] font-semibold uppercase leading-tight tracking-[0.02em]">{p.title}</span>
                <span className="mt-3 block max-w-[34ch] text-[0.98rem] text-paper/60">{p.text}</span>
              </Open>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
