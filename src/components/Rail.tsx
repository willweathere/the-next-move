import { CHAPTERS } from '../content'
import { useCurrent } from './useCurrent'

/* The scoresheet: a quiet move list fixed to the left edge on wide screens.
   It marks the chapter being read and doubles as navigation. Hidden where
   it would crowd the content, and on the hero, where the board does the job. */
export default function Rail() {
  const { current } = useCurrent()
  const idx = CHAPTERS.findIndex((c) => c.id === current)
  const sec = typeof document !== 'undefined' ? document.getElementById(current) : null
  const dark = sec?.dataset.nav === 'dark'
  const visible = current !== 'top'

  return (
    <nav
      aria-label="Chapters"
      className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 min-[1400px]:block ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'} ${dark ? 'on-dark text-paper' : 'text-ink'}`}
    >
      <ol className="flex flex-col gap-1">
        {CHAPTERS.map((c, i) => {
          const on = c.id === current
          const done = idx > -1 && i < idx
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? 'location' : undefined}
                tabIndex={visible ? 0 : -1}
                className="group flex h-7 items-center gap-3"
              >
                <span className={`block h-2 w-2 transition-colors duration-500 ${on ? 'bg-lime' : done ? 'bg-current opacity-60' : 'border border-current opacity-35'}`} aria-hidden="true" />
                <span className={`t-num text-[0.66rem] font-semibold tracking-[0.12em] transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-40 group-hover:opacity-90'}`}>{c.n}</span>
                <span className={`pointer-events-none whitespace-nowrap px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
                  {c.short}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
