import { m, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/* One timing system for the whole site: every entrance shares the same
   easing and a short list of durations, so movement reads as one voice. */
export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1]
export const DUR = { fast: 0.45, base: 0.85, slow: 1.25 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
}

/** True once the element has entered the viewport. Uses the intersection
 *  observer plus a scroll-position check, so a jump link or a fast scroll
 *  can never leave content hidden. */
export function useShown<T extends HTMLElement>(margin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const observed = useInView(ref, { once: true, margin: margin as never })
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (shown) return
    if (observed) { setShown(true); return }
    const check = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) setShown(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    const t = window.setTimeout(check, 1200)
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); window.clearTimeout(t) }
  }, [observed, shown])
  return [ref, shown] as const
}

type Tag = 'div' | 'section' | 'p' | 'li' | 'figure' | 'header' | 'ol' | 'ul'

/** Fades and lifts its children in once, when they enter the viewport.
 *  Under reduced motion the content is simply rendered. */
export function Reveal({ children, className, delay = 0, as = 'div', variants = fadeUp }: { children: ReactNode; className?: string; delay?: number; as?: Tag; variants?: Variants }) {
  const reduce = useReducedMotion()
  const [ref, shown] = useShown<HTMLElement>()
  if (reduce) { const Plain = as; return <Plain className={className}>{children}</Plain> }
  const M = m[as]
  return (
    <M ref={ref as never} className={className} variants={variants} initial="hidden" animate={shown ? 'show' : 'hidden'} transition={{ delay }}>
      {children}
    </M>
  )
}

/** A headline whose lines slide up from behind a mask, one after another.
 *  Screen readers get the sentence once, as plain text. */
export function MaskLines({ lines, as: Tag = 'h2', className, delay = 0, immediate = false }: { lines: ReactNode[]; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; delay?: number; immediate?: boolean }) {
  const reduce = useReducedMotion()
  const [ref, inView] = useShown<HTMLHeadingElement>('0px 0px -12% 0px')
  const shown = immediate || inView
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          {reduce ? (
            <span className="block">{line}</span>
          ) : (
            <m.span
              className="block will-change-transform"
              initial={{ y: '108%' }}
              animate={{ y: shown ? '0%' : '108%' }}
              transition={{ duration: DUR.slow, ease: EASE, delay: delay + i * 0.11 }}
            >
              {line}
            </m.span>
          )}
        </span>
      ))}
    </Tag>
  )
}

/** Images open from a clipped mask and settle from a slight scale. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  const [ref, shown] = useShown<HTMLDivElement>('0px 0px -15% 0px')
  if (reduce) return <div className={className}>{children}</div>
  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: shown ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
    >
      <m.div className="h-full w-full" initial={{ scale: 1.08 }} animate={{ scale: shown ? 1 : 1.08 }} transition={{ duration: 1.8, ease: EASE, delay }}>
        {children}
      </m.div>
    </m.div>
  )
}

/** The chapter running head: move number, square and label, e.g. "02 · c3 · Chess". */
export function ChapterHead({ n, square, label, dark = false }: { n: string; square: string; label: string; dark?: boolean }) {
  return (
    <Reveal className={`flex items-center gap-4 ${dark ? 'text-paper/60' : 'text-mute'}`}>
      <span className="t-label t-num flex items-center gap-3">
        <span className={`h-2.5 w-2.5 ${dark ? 'bg-lime' : 'bg-ink'}`} aria-hidden="true" />
        <span className={dark ? 'text-paper' : 'text-ink'}>{n}</span>
        <span aria-hidden="true">/</span>
        <span className="font-serif text-[0.95rem] normal-case italic tracking-normal">{square}</span>
      </span>
      <span className={`h-px w-10 ${dark ? 'bg-paper/25' : 'bg-ink/20'}`} aria-hidden="true" />
      <span className="t-label">{label}</span>
    </Reveal>
  )
}
