import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal, EASE } from '../components/motion'

type Skill = { name: string; from: string; why: string; href: string; link: string }

const SKILLS: Skill[] = [
  { name: 'Leadership', from: 'Football captaincy', why: 'Captaining both Alexandra United teams means setting the standard, organising people and taking responsibility when the game is not going well.', href: '#football', link: 'Football' },
  { name: 'Teamwork', from: 'Alexandra United FC', why: 'Playing for two teams every weekend is a constant exercise in reading teammates, covering for each other and working to a shared plan.', href: '#football', link: 'Football' },
  { name: 'Communication', from: 'Football and refereeing', why: 'A captain has to be heard; a referee has to be understood. Both depend on saying the right thing clearly and at the right moment.', href: '#refereeing', link: 'Refereeing' },
  { name: 'Strategic thinking', from: 'Competitive chess', why: 'Tournament chess, including three Gigafinal qualifications and county play, is practice in planning several moves ahead and weighing options under time pressure.', href: '#chess', link: 'Chess' },
  { name: 'Reliability', from: 'Four years as a swimming helper', why: 'Being there week after week for four years is the clearest proof that people can count on me.', href: '#swimming', link: 'Swimming' },
  { name: 'Long-term commitment', from: 'Swimming, football and DofE', why: 'None of these happened in a term. Each is a commitment measured in seasons and years, carried alongside school.', href: '#dofe', link: 'Duke of Edinburgh' },
  { name: 'Decision-making', from: 'Refereeing and chess', why: 'Both reward the same discipline: gather the information, decide, and commit to the decision.', href: '#refereeing', link: 'Refereeing' },
  { name: 'Creativity', from: 'Published writing', why: 'Having writing published in Poetry Escape shows an ability to shape ideas into language that other people want to read.', href: '#writing', link: 'Published writing' },
]

export default function Skills() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const s = SKILLS[active]

  return (
    <section id="skills" className="section bg-paper-2">
      <div className="wrap">
        <Reveal className="max-w-[900px]">
          <p className="eyebrow">Transferable skills</p>
          <h2 className="display mt-5">Different experiences.<br />Shared skills.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <ul className="border-t border-line" role="tablist" aria-label="Skills">
              {SKILLS.map((sk, i) => {
                const on = i === active
                return (
                  <li key={sk.name} className="border-b border-line">
                    <button
                      type="button"
                      role="tab"
                      id={`skill-tab-${i}`}
                      aria-selected={on}
                      aria-controls="skill-panel"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`group flex w-full items-center justify-between gap-6 py-4 text-left transition-colors duration-300 ${on ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
                    >
                      <span className="flex items-center gap-5">
                        <span className={`h-2.5 w-2.5 transition-colors duration-300 ${on ? 'bg-lime' : 'bg-line group-hover:bg-ink/40'}`} aria-hidden="true" />
                        <span className="font-serif text-[1.55rem] leading-none sm:text-[1.8rem]">{sk.name}</span>
                      </span>
                      <span className="hidden text-[0.68rem] uppercase tracking-[0.16em] text-mute sm:block">{sk.from}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} className="relative min-h-[260px] border border-ink bg-paper p-8 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={s.name}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="eyebrow">Demonstrated through</p>
                  <p className="mt-2 font-serif text-[2rem] leading-tight">{s.from}</p>
                  <p className="mt-5 max-w-[46ch] text-ink-2">{s.why}</p>
                  <a href={s.href} className="link-line mt-8 inline-block text-[0.76rem] font-semibold uppercase tracking-[0.16em]">
                    Go to {s.link}
                  </a>
                </motion.div>
              </AnimatePresence>
              <span className="pointer-events-none absolute right-6 top-6 font-serif text-5xl text-line" aria-hidden="true">0{active + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
