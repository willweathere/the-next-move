import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
]

export default function Nav() {
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active-section indicator: whichever tracked section owns the middle of the viewport.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    if (!targets.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? 'bg-paper/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="wrap flex items-center justify-between px-[var(--gutter)] py-4">
        <a href="#top" className={`font-serif text-[1.35rem] tracking-tight transition-colors duration-500 ${scrolled || open ? 'text-ink' : 'text-paper'}`}>
          The Next Move<span className="text-lime">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              className={`link-line text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${scrolled ? 'text-ink-2 hover:text-ink' : 'text-paper/80 hover:text-paper'} ${active === l.id ? 'after:scale-x-100' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`md:hidden text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${scrolled || open ? 'text-ink' : 'text-paper'}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper px-[var(--gutter)] py-6 md:hidden"
      >
        <ul className="flex flex-col divide-y divide-line">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === l.id ? 'true' : undefined}
                className="flex items-center justify-between py-4 font-serif text-2xl"
              >
                {l.label}
                {active === l.id && <span className="h-2 w-2 bg-lime" aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
