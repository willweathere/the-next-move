import { ChapterHead, MaskLines, Reveal } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'

/* The book is built with CSS 3D: cover, spine, page block and back board.
   It rests at an angle and the cover opens a little on hover or focus.
   It is an illustration, labelled as such: not the published cover. */

export default function Writing() {
  const c = chapter('writing')
  return (
    <section id="writing" className="grain section relative overflow-hidden bg-ivory">
      <div className="wrap relative">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <div>
            <MaskLines className="t-display" lines={['Every story', 'has a voice.']} />
            <Reveal delay={0.1}>
              <p className="t-label mt-10 text-mute">Published in</p>
              <Open id="poetry-escape" className="link-line mt-2 inline-block font-serif text-[clamp(2.4rem,4.6vw,3.8rem)] italic leading-none" label="Poetry Escape. Open details">
                Poetry Escape
              </Open>
              <p className="t-lead measure mt-8 text-ink-2">
                Published writing demonstrating creativity, written communication and the ability to express ideas through language.
              </p>
              <p className="measure mt-4 text-ink-2/80">
                Having work selected for a published book is a reminder that writing is a skill like any other: it improves with practice and it carries ideas further than you expect.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="order-first lg:order-none">
            <Open id="poetry-escape" className="book-stage mx-auto block w-[62%] max-w-[330px] py-6 sm:w-[48%] lg:w-[64%]" label="Book illustration: Poetry Escape. Open details">
              <span className="book block" aria-hidden="true">
                <span className="book-back" />
                <span className="book-pages" />
                <span className="book-edge" />
                <span className="book-spine" />
                <span className="book-cover">
                  <span className="book-cover-inside" />
                  <span className="book-cover-front flex flex-col justify-between bg-ink p-[9%] text-paper shadow-[inset_6px_0_10px_-6px_rgba(255,255,255,0.18)]">
                    <span className="t-label text-[0.55rem] text-paper/50">Published writing</span>
                    <span>
                      <span className="block font-serif text-[clamp(2.2rem,4.2vw,3rem)] leading-[0.9] tracking-tight">Poetry</span>
                      <span className="block font-serif text-[clamp(2.2rem,4.2vw,3rem)] italic leading-[0.9] tracking-tight text-lime">Escape</span>
                      <span className="mt-5 block h-px w-12 bg-paper/40" />
                    </span>
                    <span className="grid h-4 w-4 grid-cols-2 grid-rows-2 border border-paper/40"><span className="bg-paper/40" /><span /><span /><span className="bg-paper/40" /></span>
                  </span>
                </span>
              </span>
              <span className="mt-12 block text-center text-[0.7rem] uppercase tracking-[0.16em] text-mute">Illustration, not the published cover</span>
            </Open>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
