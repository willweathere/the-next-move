import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/* One timing system for the whole site: every entrance uses the same
   easing and a small set of durations, so movement reads as one voice. */
export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1]
export const DUR = { fast: 0.5, base: 0.8, slow: 1.2 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'p' | 'li' | 'figure' | 'header'
  variants?: Variants
}

/** Shows its children once they are in view. Detection is the intersection
 *  observer plus a plain scroll-position check, so a fast scroll, a jump
 *  link or a missed observer callback can never leave content hidden.
 *  Under prefers-reduced-motion the content is simply rendered. */
export function Reveal({ children, className, delay = 0, as = 'div', variants = fadeUp }: RevealProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const observed = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
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
    // Final safety net: anything above the fold after load is shown regardless.
    const t = window.setTimeout(check, 1200)
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); window.clearTimeout(t) }
  }, [observed, shown])

  const Tag = motion[as]
  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
  return (
    <Tag
      ref={ref as never}
      className={className}
      variants={variants}
      initial="hidden"
      animate={shown ? 'show' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

/** Splits a headline into words and staggers them in. */
export function SplitWords({ text, className, delay = 0, as: Tag = 'span' }: { text: string; className?: string; delay?: number; as?: 'span' | 'h1' | 'h2' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  if (reduce) return <Tag className={className}>{text}</Tag>
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: DUR.base, ease: EASE, delay: delay + i * 0.08 }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
