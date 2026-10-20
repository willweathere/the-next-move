import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { CHAPTERS, NAV } from '../content'
import { useCurrent } from './useCurrent'
import { EASE } from './motion'

/** Which primary nav item a section belongs to. */
function groupOf(id: string) {
  if (id === 'about') return 'about'
  if (id === 'education') return 'education'
  const ch = CHAPTERS.find((c) => c.id === id)
  if (id === 'achievements' || ch?.part === 'Achievements') return 'achievements'
  if (id === 'experience' || ch?.part === 'Experience') return 'experience'
  return ''
}

export default function Nav() {
  const { current, dark } = useCurrent()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const group = groupOf(current)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock the page, move focus in, Esc and Tab handled, focus returns to the button.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => sheet.current?.querySelector<HTMLElement>('a')?.focus(), 60)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); button.current?.focus() }
      if (e.key === 'Tab' && sheet.current) {
        const f = [button.current!, ...Array.from(sheet.current.querySelectorAll<HTMLElement>('a'))]
        const i = f.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus() }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.clearTimeout(t); document.removeEventListener('keydown', onKey) }
  }, [open])

  const solid = scrolled && !open
  const onDark = open ? true : dark
  const tone = onDark ? 'text-paper' : 'text-ink'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${onDark ? 'on-dark' : ''}`}>
      <div
        className={`absolute inset-0 border-b transition-[background-color,border-color] duration-500 ${solid ? (onDark ? 'border-paper/10 bg-ink/85 backdrop-blur-md' : 'border-ink/10 bg-paper/85 backdrop-blur-md') : 'border-transparent bg-transparent'}`}
        aria-hidden="true"
      />
      <div className="wrap relative flex h-[var(--nav-h)] items-center justify-between px-[var(--gutter)]">
        <a href="#top" className={`group flex items-center gap-3 font-serif text-[1.4rem] tracking-tight transition-colors duration-500 ${tone}`} aria-label="The Next Move, back to the top">
          <span className="grid h-[18px] w-[18px] grid-cols-2 grid-rows-2 border border-current" aria-hidden="true">
            <span className="bg-current" /><span /><span /><span className="bg-lime transition-colors group-hover:bg-current" />
          </span>
          <span>The Next Move<span className="text-lime">.</span></span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((l) => {
            const on = group === l.id
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={on ? 'location' : undefined}
                className={`link-line flex min-h-11 items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.17em] transition-colors duration-500 ${onDark ? (on ? 'text-paper' : 'text-paper/65 hover:text-paper') : on ? 'text-ink' : 'text-ink/60 hover:text-ink'}`}
              >
                <span className={`h-1.5 w-1.5 bg-lime transition-transform duration-500 ${on ? 'scale-100' : 'scale-0'}`} aria-hidden="true" />
                {l.label}
              </a>
            )
          })}
        </nav>

        <button
          ref={button}
          type="button"
          className={`relative z-10 flex h-11 items-center gap-3 text-[0.74rem] font-semibold uppercase tracking-[0.17em] transition-colors duration-500 md:hidden ${tone}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span className={`absolute left-0 right-0 h-px bg-current transition-transform duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0.5'}`} />
            <span className={`absolute left-0 right-0 h-px bg-current transition-transform duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
          </span>
        </button>
      </div>

      {/* Reading progress: one transform, no layout work */}
      <m.div className="absolute inset-x-0 bottom-0 h-px origin-left bg-lime" style={{ scaleX: progress }} aria-hidden="true" />

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={sheet}
            className="fixed inset-0 -z-10 overflow-y-auto bg-ink px-[var(--gutter)] pb-10 pt-[calc(var(--nav-h)+1.5rem)] text-paper md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul className="border-t border-paper/15">
                {NAV.map((l, i) => (
                  <m.li
                    key={l.id}
                    className="border-b border-paper/15"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                  >
                    <a href={`#${l.id}`} onClick={() => setOpen(false)} aria-current={group === l.id ? 'location' : undefined} className="flex items-center justify-between py-5 font-serif text-[2.4rem] leading-none">
                      {l.label}
                      <span className={`h-2.5 w-2.5 ${group === l.id ? 'bg-lime' : 'border border-paper/30'}`} aria-hidden="true" />
                    </a>
                  </m.li>
                ))}
              </ul>
              <p className="t-label mt-10 text-paper/45">Every chapter</p>
              <ol className="mt-4 grid grid-cols-2 gap-x-6">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 text-[0.95rem] text-paper/75">
                      <span className="t-num text-[0.7rem] font-semibold text-paper/40">{c.n}</span>{c.short}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
