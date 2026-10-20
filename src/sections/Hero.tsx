import { motion, useReducedMotion } from 'framer-motion'
import Chessboard from '../components/Chessboard'
import { SplitWords, EASE, DUR } from '../components/motion'

export default function Hero() {
  const reduce = useReducedMotion()
  const late = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: DUR.base, ease: EASE, delay: d } })

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      {/* A faint board texture anchors the identity without competing with the type. */}
      <div className="checker pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.35]" style={{ ['--c' as string]: 'rgba(245,244,240,0.05)', ['--s' as string]: '96px' }} aria-hidden="true" />

      <div className="wrap relative grid min-h-[100svh] grid-cols-1 items-center gap-12 px-[var(--gutter)] pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-32">
        <div className="max-w-[640px]">
          <motion.p className="eyebrow eyebrow--light" {...late(0.1)}>Personal portfolio</motion.p>
          <h1 className="mt-6 font-serif text-[clamp(3.6rem,11vw,8.5rem)] leading-[0.92] tracking-[-0.02em]">
            <SplitWords text="THE NEXT" delay={0.25} />
            <br />
            <SplitWords text="MOVE." delay={0.45} className="text-lime" />
          </h1>
          <motion.p className="mt-7 font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] italic text-paper/90" {...late(0.9)}>
            Every move tells a story.
          </motion.p>
          <motion.p className="mt-6 max-w-[48ch] text-[1.02rem] leading-relaxed text-paper/70 sm:text-[1.08rem]" {...late(1.05)}>
            Leadership, strategy, discipline and creativity &mdash; demonstrated through sport, competition, volunteering and writing.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap items-center gap-6" {...late(1.2)}>
            <a
              href="#about"
              className="group inline-flex items-center gap-4 border border-paper/40 px-6 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 hover:border-lime hover:bg-lime hover:text-ink focus-visible:bg-lime focus-visible:text-ink"
            >
              Explore the portfolio
              <span aria-hidden="true" className="inline-block h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
            </a>
            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-paper/45">Hover the board to navigate</span>
          </motion.div>
        </div>

        <div className="lg:justify-self-end lg:w-full">
          <Chessboard />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-paper/10" aria-hidden="true" />
    </section>
  )
}
