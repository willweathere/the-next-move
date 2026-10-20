import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, EASE } from '../components/motion'
import { Open } from '../components/Detail'

/* The book is CSS: a spine, a cover and a page that lifts as the section
   enters. A real cover image can replace the illustration later. */

export default function Writing() {
  const reduce = useReducedMotion()
  return (
    <section id="writing" className="section bg-ivory">
      <div className="wrap">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <Open id="poetry-escape" className="group relative mx-auto block aspect-[3/4] w-full max-w-[360px] transition-transform duration-500 hover:-translate-y-1" label="Poetry Escape. Open details">
            <div className="absolute inset-0" aria-hidden="true">
              {/* Shadow page beneath */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 border border-ink/20 bg-paper" />
              {/* Page that reveals */}
              <motion.div
                className="absolute inset-0 origin-left border border-ink/30 bg-paper"
                initial={reduce ? false : { rotateY: -70, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
                style={{ transformPerspective: 1200 }}
              />
              {/* Cover */}
              <div className="absolute inset-0 flex flex-col justify-between border border-ink bg-ink p-7 text-paper">
                <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-paper/60">
                  <span>Anthology</span>
                  <span>Contributor</span>
                </div>
                <div>
                  <p className="font-serif text-[2.6rem] leading-[0.95] tracking-tight">Poetry<br /><em className="text-lime">Escape</em></p>
                  <span className="mt-5 block h-px w-14 bg-paper/40" />
                </div>
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-paper/60">Published writing</p>
              </div>
              <div className="absolute inset-y-0 left-0 w-[10px] bg-ink/85" />
            </div>
            </Open>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow">Published writing</p>
              <h2 className="display mt-5">Every story<br />has a voice.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Open id="poetry-escape" className="link-line mt-8 inline-block font-serif text-[clamp(2rem,4vw,3rem)] leading-tight" label="Poetry Escape. Open details">Poetry Escape</Open>
              <p className="mt-5 max-w-[48ch] text-[1.1rem] leading-relaxed text-ink-2">
                Published writing demonstrating creativity, written communication and the ability to express ideas through language.
              </p>
              <p className="mt-4 max-w-[48ch] text-ink-2/80">
                Having work selected for a published book is a reminder that writing is a skill like any other: it improves with practice and it carries ideas further than you expect.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
