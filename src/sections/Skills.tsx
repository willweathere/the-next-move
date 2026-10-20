import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ChapterHead, MaskLines, Reveal, EASE } from '../components/motion'
import { CHAPTERS, chapter } from '../content'

type Skill = { name: string; from: string; why: string; links: string[] }

/* Which chapters each skill comes from, exactly as the brief connects them. */
const SKILLS: Skill[] = [
  { name: 'Leadership', from: 'Football captaincy', why: 'Captaining both Alexandra United teams means setting the standard, organising people and taking responsibility when the game is not going well.', links: ['football'] },
  { name: 'Teamwork', from: 'Alexandra United FC', why: 'Playing for two teams every weekend is a constant exercise in reading teammates, covering for each other and working to a shared plan.', links: ['football'] },
  { name: 'Communication', from: 'Football and refereeing', why: 'A captain has to be heard; a referee has to be understood. Both depend on saying the right thing clearly and at the right moment.', links: ['football', 'refereeing'] },
  { name: 'Strategic thinking', from: 'Competitive chess', why: 'Tournament chess, including three Gigafinal qualifications and county play, is practice in planning several moves ahead and weighing options under time pressure.', links: ['chess'] },
  { name: 'Reliability', from: 'Four years as a swimming helper', why: 'Being there week after week for four years is the clearest proof that people can count on me.', links: ['swimming'] },
  { name: 'Long-term commitment', from: 'Swimming, football and DofE', why: 'None of these happened in a term. Each is a commitment measured in seasons and years, carried alongside school.', links: ['swimming', 'football', 'dofe'] },
  { name: 'Decision-making', from: 'Refereeing and chess', why: 'Both reward the same discipline: gather the information, decide, and commit to the decision.', links: ['refereeing', 'chess'] },
  { name: 'Creativity', from: 'Published writing', why: 'Having writing published in Poetry Escape shows an ability to shape ideas into language that other people want to read.', links: ['writing'] },
]
const SOURCES = CHAPTERS.filter((c) => c.part === 'Achievements' || c.part === 'Experience')

export default function Skills() {
  const c = chapter('skills')
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const s = SKILLS[active]

  // WAI-ARIA tabs: arrows move and select, Home and End jump, one tab stop.
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = SKILLS.length - 1
    const to = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key]
    if (to === undefined) return
    e.preventDefault()
    const n = (to + SKILLS.length) % SKILLS.length
    setActive(n)
    tabs.current[n]?.focus()
  }

  return (
    <section id="skills" data-nav="dark" className="on-dark grain grain--dark section relative overflow-hidden bg-ink text-paper">
      <div className="wrap relative">
        <ChapterHead n={c.n} square={c.square} label={c.label} dark />
        <MaskLines className="t-display mt-10" lines={['Different experiences.', <span key="s" className="italic text-paper/80">Shared skills.</span>]} />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="border-t border-paper/20" role="tablist" aria-label="Transferable skills" aria-orientation="vertical">
              {SKILLS.map((sk, i) => {
                const on = i === active
                return (
                  <button
                    key={sk.name}
                    ref={(el) => { tabs.current[i] = el }}
                    type="button"
                    role="tab"
                    id={`skill-tab-${i}`}
                    aria-selected={on}
                    aria-controls="skill-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKey}
                    className={`group flex w-full items-center justify-between gap-6 border-b border-paper/15 py-4 text-left transition-colors duration-300 ${on ? 'text-paper' : 'text-paper/50 hover:text-paper/85'}`}
                  >
                    <span className="flex items-center gap-5">
                      <span className="t-num w-6 text-[0.7rem] font-semibold tracking-[0.12em] text-paper/35">0{i + 1}</span>
                      <span className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-none">{sk.name}</span>
                    </span>
                    <span className={`h-2.5 w-2.5 shrink-0 transition-all duration-300 ${on ? 'scale-100 bg-lime' : 'scale-75 border border-paper/30'}`} aria-hidden="true" />
                  </button>
                )
              })}
            </div>
            <p className="mt-4 hidden text-[0.78rem] text-paper/40 [@media(hover:hover)]:block">Use the arrow keys to move through the list.</p>
          </Reveal>

          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} className="relative border border-paper/20 bg-ink-3 p-7 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={s.name}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="t-label text-paper/50">Demonstrated through</p>
                  <p className="mt-2 font-serif text-[clamp(1.9rem,3vw,2.5rem)] leading-tight">{s.from}</p>
                  <p className="mt-5 max-w-[46ch] text-paper/70">{s.why}</p>

                  {/* Connections: the six experience chapters as a row of squares, lit where this skill comes from */}
                  <p className="t-label mt-9 text-paper/50">Where it comes from</p>
                  <ul className="mt-3 grid grid-cols-3 gap-px border border-paper/15 bg-paper/15 sm:grid-cols-6">
                    {SOURCES.map((src) => {
                      const lit = s.links.includes(src.id)
                      return (
                        <li key={src.id} className={lit ? 'bg-lime text-ink' : 'bg-ink-3 text-paper/35'}>
                          <a href={`#${src.id}`} tabIndex={lit ? 0 : -1} aria-hidden={lit ? undefined : true} className="flex aspect-square flex-col justify-between p-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80">
                            <span className="t-num">{src.n}</span>
                            <span>{src.short}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </m.div>
              </AnimatePresence>
              <span className="t-num pointer-events-none absolute right-6 top-5 font-serif text-5xl text-paper/10" aria-hidden="true">0{active + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
