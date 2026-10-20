import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { EASE } from './motion'
import { CHAPTERS } from '../content'

/* "Little pages": any clickable fact on the site opens a focused detail
   sheet with the verified information behind it, the skills it shows and
   a link to its chapter. One sheet for the whole site, driven by an id. */

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

/** A button that opens a detail page. Extra button props (hover handlers, style) pass through. */
export function Open({ id, className, children, label, ...rest }: { id: string; className?: string; children: ReactNode; label?: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'onClick'>) {
  const { open } = useDetail()
  return (
    <button {...rest} type="button" onClick={() => open(id)} className={`cursor-pointer text-left ${className || ''}`} aria-haspopup="dialog" aria-label={label}>
      {children}
    </button>
  )
}

function DetailDialog({ page, onClose }: { page: DetailPage | null; onClose: () => void }) {
  const reduce = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const opener = useRef<Element | null>(null)
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

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
      ;(opener.current as HTMLElement | null)?.focus?.({ preventScroll: true })
    }
  }, [page, onClose])

  const ch = page ? CHAPTERS.find((c) => `#${c.id}` === page.section.href) : undefined
  const from = wide ? { x: 48, opacity: 0 } : { y: 48, opacity: 0 }

  return (
    <AnimatePresence>
      {page && (
        <m.div
          className="fixed inset-0 z-[80] flex items-end justify-end bg-ink/55 md:items-stretch"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2, ease: EASE } }}
          transition={{ duration: 0.3, ease: EASE }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            className="relative flex max-h-[88svh] w-full flex-col bg-paper text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] md:max-h-none md:w-[min(560px,92vw)]"
            initial={reduce ? false : from}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={reduce ? undefined : { ...from, transition: { duration: 0.2, ease: EASE } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="checker h-2 shrink-0" style={{ ['--s' as string]: '8px', ['--c' as string]: '#121212' }} aria-hidden="true" />
            <div className="flex items-center justify-between gap-4 border-b border-line px-7 py-4 sm:px-10">
              <p className="t-label t-num flex items-center gap-3 text-mute">
                <span className="h-2 w-2 bg-lime" aria-hidden="true" />
                {ch ? <><span className="text-ink">{ch.n}</span><span aria-hidden="true">/</span><span className="font-serif text-[0.95rem] normal-case italic tracking-normal">{ch.square}</span><span>{ch.short}</span></> : page.section.label}
              </p>
              <button
                type="button"
                onClick={onClose}
                data-autofocus
                className="grid h-11 w-11 shrink-0 place-items-center border border-line transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                aria-label="Close"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 pb-10 pt-8 sm:px-10 md:pt-14">
              <p className="t-label text-mute">{page.kicker}</p>
              <h2 id="detail-title" className="mt-3 font-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.015em]">{page.title}</h2>

              <div className="mt-8 space-y-4 text-[1.08rem] leading-relaxed text-ink-2">
                {page.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {page.facts && (
                <dl className="mt-9 grid grid-cols-2 border-t border-ink">
                  {page.facts.map((f, i) => (
                    <div key={f.k} className={`py-5 ${i % 2 === 0 ? 'border-r border-line pr-4' : 'pl-5'}`}>
                      <dt className="t-label text-mute">{f.k}</dt>
                      <dd className="m-0 mt-2 font-serif text-[1.7rem] leading-tight">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {page.skills && (
                <div className="mt-9 border-t border-line pt-6">
                  <p className="t-label text-mute">Transferable skills</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {page.skills.map((s) => (
                      <li key={s} className="border border-ink/20 px-3 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.12em]">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 border-t border-line px-7 py-5 sm:px-10">
              <a href={page.section.href} onClick={onClose} className="btn btn--solid">
                Go to {page.section.label}
                <svg className="arrow h-3 w-5" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </a>
              <button type="button" onClick={onClose} className="link-line t-label inline-flex min-h-11 items-center text-ink-2">Back</button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export { PAGES }
