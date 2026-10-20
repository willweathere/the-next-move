import { Reveal } from '../components/motion'
import { Open } from '../components/Detail'

const PRINCIPLES = [
  { n: '01', title: 'Understand the rules.', text: 'Knowing the laws of the game well enough to apply them without hesitation.' },
  { n: '02', title: 'Communicate clearly.', text: 'Players, coaches and parents all need to understand a decision the moment it is made.' },
  { n: '03', title: 'Make informed decisions.', text: 'Seeing the whole picture, deciding, and standing by it under pressure.' },
]

function Badge() {
  return (
    <svg viewBox="0 0 120 140" className="h-28 w-24 sm:h-36 sm:w-32" aria-hidden="true">
      <path d="M60 6 108 24v44c0 30-20 52-48 64C32 120 12 98 12 68V24z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 22 94 35v33c0 22-15 38-34 47-19-9-34-25-34-47V35z" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <text x="60" y="78" textAnchor="middle" fontFamily="Instrument Serif, Georgia, serif" fontSize="40" fill="currentColor">6</text>
      <text x="60" y="98" textAnchor="middle" fontFamily="Manrope, system-ui, sans-serif" fontSize="8" letterSpacing="2.5" fill="currentColor">REFEREE</text>
    </svg>
  )
}

export default function Refereeing() {
  return (
    <section id="refereeing" className="section relative overflow-hidden bg-ink text-paper">
      {/* Thin pitch markings as a quiet backdrop */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="#f5f4f0" strokeWidth="1">
          <circle cx="600" cy="300" r="140" />
          <line x1="600" y1="0" x2="600" y2="600" />
          <rect x="-200" y="120" width="300" height="360" />
          <rect x="1100" y="120" width="300" height="360" />
        </g>
      </svg>

      <div className="wrap relative">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="eyebrow eyebrow--light">Refereeing</p>
            <h2 className="display mt-5">Clarity under pressure.</h2>
            <p className="mt-8 max-w-[52ch] text-[1.1rem] leading-relaxed text-paper/70">
              As a qualified Level 6 referee I am responsible for a game from the first whistle to the last. It has taught me to know the rules, explain decisions clearly and make them with confidence.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center gap-8 text-paper">
            <Badge />
            <div>
              <p className="eyebrow eyebrow--light">Qualification</p>
              <p className="font-serif text-[clamp(4rem,9vw,7.5rem)] leading-[0.9] tracking-tight">
                Level <span className="text-lime">6</span>
              </p>
            </div>
          </Reveal>
        </div>

        <ol className="mt-20 grid grid-cols-1 border-t border-paper/15 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 0.1} className="border-b border-paper/15 md:border-b-0 md:border-r md:last:border-r-0">
              <Open id={`principle-${i + 1}`} className="group block w-full py-8 transition-colors duration-500 md:px-8 md:first:pl-0 md:hover:bg-paper/[0.04]" label={`${p.n} ${p.title} Open details`}>
                <p className="font-serif text-xl text-lime">{p.n}</p>
                <span className="mt-4 block h-px w-10 bg-paper/40 transition-all duration-500 group-hover:w-20 group-hover:bg-lime" aria-hidden="true" />
                <h3 className="mt-5 text-[1.6rem] uppercase tracking-tight text-paper">{p.title}</h3>
                <p className="mt-3 max-w-[32ch] text-[0.95rem] text-paper/65">{p.text}</p>
              </Open>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
