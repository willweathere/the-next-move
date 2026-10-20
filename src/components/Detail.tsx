import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from './motion'

/* "Little pages": any clickable fact on the site opens a focused detail panel
   with the verified information behind it, the skills it demonstrates and a
   link to its section. One panel for the whole site, driven by an id. */

export type DetailPage = {
  id: string
  kicker: string
  title: string
  body: string[]
  facts?: { k: string; v: string }[]
  skills?: string[]
  section: { href: string; label: string }
}

const PAGES: Record<string, DetailPage> = {
  'stat-swimming': {
    id: 'stat-swimming', kicker: 'Four years', title: 'Swimming helper',
    body: ['Four years as a swimming helper, developing reliability, consistency and a commitment to supporting others.', 'Turning up every week, year after year, is the clearest proof that people can rely on you.'],
    facts: [{ k: 'Duration', v: '4 years' }, { k: 'Role', v: 'Swimming helper' }],
    skills: ['Reliability', 'Long-term commitment'],
    section: { href: '#swimming', label: 'Swimming' },
  },
  'stat-gigafinal': {
    id: 'stat-gigafinal', kicker: 'Three times', title: 'Chess Gigafinal',
    body: ['Qualified for the Gigafinal three times, through competitive tournament chess.'],
    facts: [{ k: 'Qualifications', v: '3' }, { k: 'Also', v: 'Surrey County, U1450' }],
    skills: ['Strategic thinking', 'Decision-making'],
    section: { href: '#chess', label: 'Chess' },
  },
  'stat-teams': {
    id: 'stat-teams', kicker: 'Two teams', title: 'Saturday and Sunday football',
    body: ['Plays for Alexandra United FC on Saturdays and Sundays, and has captained both teams at different points.'],
    facts: [{ k: 'Club', v: 'Alexandra United FC' }, { k: 'Teams', v: 'Saturday and Sunday' }],
    skills: ['Leadership', 'Teamwork', 'Communication'],
    section: { href: '#football', label: 'Football' },
  },
  'level-6': {
    id: 'level-6', kicker: 'Qualification', title: 'Level 6 football referee',
    body: ['A qualified Level 6 referee, responsible for a game from the first whistle to the last.', 'Refereeing depends on understanding the rules, communicating clearly and making informed decisions under pressure.'],
    facts: [{ k: 'Level', v: '6' }],
    skills: ['Communication', 'Decision-making'],
    section: { href: '#refereeing', label: 'Refereeing' },
  },
  'gigafinal-1': { id: 'gigafinal-1', kicker: 'Gigafinal', title: 'First qualification', body: ['One of three Gigafinal qualifications earned through competitive tournament chess.'], skills: ['Strategic thinking', 'Concentration', 'Patience'], section: { href: '#chess', label: 'Chess' } },
  'gigafinal-2': { id: 'gigafinal-2', kicker: 'Gigafinal', title: 'Second qualification', body: ['One of three Gigafinal qualifications earned through competitive tournament chess.'], skills: ['Strategic thinking', 'Concentration', 'Patience'], section: { href: '#chess', label: 'Chess' } },
  'gigafinal-3': { id: 'gigafinal-3', kicker: 'Gigafinal', title: 'Third qualification', body: ['One of three Gigafinal qualifications earned through competitive tournament chess.'], skills: ['Strategic thinking', 'Concentration', 'Patience'], section: { href: '#chess', label: 'Chess' } },
  'surrey-county': {
    id: 'surrey-county', kicker: 'County chess', title: 'Surrey County, U1450',
    body: ['Played for Surrey County in the U1450 category.'],
    facts: [{ k: 'Team', v: 'Surrey County' }, { k: 'Category', v: 'U1450' }],
    skills: ['Strategic thinking', 'Decision-making'],
    section: { href: '#chess', label: 'Chess' },
  },
  'theme-strategic': { id: 'theme-strategic', kicker: 'Chess', title: 'Strategic thinking', body: ['Planning several moves ahead and weighing options under time pressure.'], section: { href: '#skills', label: 'Transferable skills' } },
  'theme-concentration': { id: 'theme-concentration', kicker: 'Chess', title: 'Concentration', body: ['Holding attention through a long game, where one lapse decides the result.'], section: { href: '#skills', label: 'Transferable skills' } },
  'theme-patience': { id: 'theme-patience', kicker: 'Chess', title: 'Patience', body: ['Waiting for the right moment rather than forcing the position.'], section: { href: '#skills', label: 'Transferable skills' } },
  'theme-decision': { id: 'theme-decision', kicker: 'Chess', title: 'Decision-making', body: ['Choosing a line and committing to it, the same discipline refereeing demands.'], section: { href: '#skills', label: 'Transferable skills' } },
  'team-saturday': { id: 'team-saturday', kicker: 'Alexandra United FC', title: 'Saturday team', body: ['One of the two Alexandra United FC teams I play for, and one of the two I have captained.'], skills: ['Teamwork', 'Communication'], section: { href: '#football', label: 'Football' } },
  'team-sunday': { id: 'team-sunday', kicker: 'Alexandra United FC', title: 'Sunday team', body: ['One of the two Alexandra United FC teams I play for, and one of the two I have captained.'], skills: ['Teamwork', 'Communication'], section: { href: '#football', label: 'Football' } },
  captaincy: {
    id: 'captaincy', kicker: 'Leadership', title: 'Captained both teams',
    body: ['I have captained both Alexandra United FC teams at different points.', 'Captaincy means setting the standard, organising people and taking responsibility when a game is not going well.'],
    skills: ['Leadership', 'Communication'],
    section: { href: '#football', label: 'Football' },
  },
  'principle-1': { id: 'principle-1', kicker: 'Refereeing · 01', title: 'Understand the rules.', body: ['Knowing the laws of the game well enough to apply them without hesitation.'], skills: ['Decision-making'], section: { href: '#refereeing', label: 'Refereeing' } },
  'principle-2': { id: 'principle-2', kicker: 'Refereeing · 02', title: 'Communicate clearly.', body: ['Players, coaches and parents all need to understand a decision the moment it is made.'], skills: ['Communication'], section: { href: '#refereeing', label: 'Refereeing' } },
  'principle-3': { id: 'principle-3', kicker: 'Refereeing · 03', title: 'Make informed decisions.', body: ['Seeing the whole picture, deciding, and standing by it under pressure.'], skills: ['Decision-making'], section: { href: '#refereeing', label: 'Refereeing' } },
  'dofe-volunteering': { id: 'dofe-volunteering', kicker: 'DofE Bronze · Volunteering', title: 'Helping coach younger children', body: ['The volunteering part of my Bronze Duke of Edinburgh\'s Award experience: helping to coach younger children.'], skills: ['Communication', 'Reliability'], section: { href: '#dofe', label: 'Duke of Edinburgh' } },
  'dofe-skills': { id: 'dofe-skills', kicker: 'DofE Bronze · Skills', title: 'Chess', body: ['Chess is the skills section of my Bronze Duke of Edinburgh\'s Award experience.'], skills: ['Strategic thinking', 'Long-term commitment'], section: { href: '#chess', label: 'Chess' } },
  'dofe-physical': { id: 'dofe-physical', kicker: 'DofE Bronze · Physical', title: 'Football', body: ['Football is the physical section of my Bronze Duke of Edinburgh\'s Award experience.'], skills: ['Teamwork', 'Long-term commitment'], section: { href: '#football', label: 'Football' } },
  'poetry-escape': {
    id: 'poetry-escape', kicker: 'Published writing', title: 'Poetry Escape',
    body: ['Writing published in the book Poetry Escape.', 'Published writing demonstrating creativity, written communication and the ability to express ideas through language.'],
    skills: ['Creativity', 'Communication'],
    section: { href: '#writing', label: 'Published writing' },
  },
  'subject-economics': { id: 'subject-economics', kicker: 'GCSE', title: 'Economics', body: ['One of four GCSE subjects I am starting in Year 10 at Glyn School.'], section: { href: '#education', label: 'Education' } },
  'subject-citizenship': { id: 'subject-citizenship', kicker: 'GCSE', title: 'Citizenship', body: ['One of four GCSE subjects I am starting in Year 10 at Glyn School.'], section: { href: '#education', label: 'Education' } },
  'subject-geography': { id: 'subject-geography', kicker: 'GCSE', title: 'Geography', body: ['One of four GCSE subjects I am starting in Year 10 at Glyn School.'], section: { href: '#education', label: 'Education' } },
  'subject-spanish': { id: 'subject-spanish', kicker: 'GCSE', title: 'Spanish', body: ['One of four GCSE subjects I am starting in Year 10 at Glyn School.'], section: { href: '#education', label: 'Education' } },
  'school': { id: 'school', kicker: 'Education', title: 'Glyn School', body: ['Year 10, my fourth year at Glyn School, starting GCSE study in Economics, Citizenship, Geography and Spanish.'], facts: [{ k: 'Year', v: '10' }, { k: 'At Glyn', v: 'Fourth year' }], section: { href: '#education', label: 'Education' } },
}

type Ctx = { open: (id: string) => void; close: () => void; current: string | null }
const DetailContext = createContext<Ctx>({ open: () => {}, close: () => {}, current: null })

export function useDetail() { return useContext(DetailContext) }

export function DetailProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<string | null>(null)
  const open = useCallback((id: string) => { if (PAGES[id]) setCurrent(id) }, [])
  const close = useCallback(() => setCurrent(null), [])
  const value = useMemo(() => ({ open, close, current }), [open, close, current])
  return (
    <DetailContext.Provider value={value}>
      {children}
      <DetailDialog page={current ? PAGES[current] : null} onClose={close} />
    </DetailContext.Provider>
  )
}

/** A button that opens a detail page. Renders its children unchanged. */
export function Open({ id, className, children, label }: { id: string; className?: string; children: ReactNode; label?: string }) {
  const { open } = useDetail()
  return (
    <button type="button" onClick={() => open(id)} className={`cursor-pointer text-left ${className || ''}`} aria-haspopup="dialog" aria-label={label}>
      {children}
    </button>
  )
}

function DetailDialog({ page, onClose }: { page: DetailPage | null; onClose: () => void }) {
  const reduce = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    if (!page) return
    opener.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 30)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      window.clearTimeout(t)
      ;(opener.current as HTMLElement | null)?.focus?.()
    }
  }, [page, onClose])

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2, ease: EASE } }}
          transition={{ duration: 0.3, ease: EASE }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            className="relative w-full max-w-[640px] bg-paper text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:border sm:border-ink"
            initial={reduce ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 12, opacity: 0, transition: { duration: 0.2, ease: EASE } }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="checker absolute inset-x-0 top-0 h-2" style={{ ['--s' as string]: '8px', ['--c' as string]: '#121212' }} aria-hidden="true" />
            <div className="max-h-[85svh] overflow-y-auto p-7 pt-9 sm:p-10 sm:pt-12">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow">{page.kicker}</p>
                  <h2 id="detail-title" className="mt-3 font-serif text-[clamp(2rem,5vw,3rem)] leading-[1]">{page.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  data-autofocus
                  className="grid h-11 w-11 shrink-0 place-items-center border border-line text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </div>

              <div className="mt-7 space-y-4 text-[1.05rem] leading-relaxed text-ink-2">
                {page.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {page.facts && (
                <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-line pt-6">
                  {page.facts.map((f) => (
                    <div key={f.k}><dt className="eyebrow">{f.k}</dt><dd className="mt-1 font-serif text-2xl">{f.v}</dd></div>
                  ))}
                </dl>
              )}

              {page.skills && (
                <div className="mt-7 border-t border-line pt-6">
                  <p className="eyebrow">Transferable skills</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {page.skills.map((s) => (
                      <li key={s} className="border border-line px-3 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.12em]">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-6">
                <a href={page.section.href} onClick={onClose} className="inline-flex items-center gap-3 bg-ink px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-lime hover:text-ink">
                  Go to {page.section.label}
                  <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
                </a>
                <button type="button" onClick={onClose} className="link-line text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-2">Back</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { PAGES }
