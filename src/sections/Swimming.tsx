import { ChapterHead, ImageReveal, MaskLines, Reveal, useShown } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'
import s900 from '../assets/img/swimming-900.jpg'
import s1600 from '../assets/img/swimming-1600.jpg'
import w900 from '../assets/img/swimming-900.webp'
import w1600 from '../assets/img/swimming-1600.webp'

const YEARS = ['Year one', 'Year two', 'Year three', 'Year four']

export default function Swimming() {
  const c = chapter('swimming')
  const [tl, shown] = useShown<HTMLOListElement>('0px 0px -15% 0px')
  return (
    <section id="swimming" className="section bg-paper-2">
      <div className="wrap">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="flex flex-col">
            <MaskLines className="t-display" lines={['Consistency', 'creates trust.']} />
            <Reveal delay={0.1}>
              <p className="t-lead measure mt-8 text-ink-2">
                Four years as a swimming helper, developing reliability, consistency and a commitment to supporting others.
              </p>
              <p className="measure mt-4 text-ink-2/80">
                Turning up every week, year after year, is its own kind of achievement. People learn they can rely on you.
              </p>
            </Reveal>

            {/* Four-year timeline: the line runs out to the fourth year, then each year is marked */}
            <Reveal delay={0.15} className="mt-auto pt-14">
              <div>
                <ol ref={tl} className="relative grid grid-cols-4">
                  <span className="absolute left-0 right-0 top-[5px] h-px bg-water/30" aria-hidden="true" />
                  <span className={`absolute left-0 top-[5px] h-px origin-left bg-water transition-transform duration-[1600ms] ease-[var(--ease-in-out)] ${shown ? 'scale-x-100' : 'scale-x-0'}`} style={{ right: '0' }} aria-hidden="true" />
                  {YEARS.map((y, i) => (
                    <li key={y} className="relative pt-7">
                      <span
                        className={`absolute left-0 top-0 h-[11px] w-[11px] rounded-full border border-water transition-colors duration-500 ${shown ? 'bg-water' : 'bg-paper-2'}`}
                        style={{ transitionDelay: shown ? `${0.3 + i * 0.35}s` : '0s' }}
                        aria-hidden="true"
                      />
                      <span className="t-num block font-serif text-3xl">0{i + 1}</span>
                      <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.16em] text-mute">{y}</span>
                    </li>
                  ))}
                </ol>
                <Open id="stat-swimming" className="group t-label mt-6 flex min-h-11 items-center gap-2 text-mute transition-colors hover:text-ink" label="Four years as a swimming helper. Open details">
                  More about four years poolside
                  <svg className="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                </Open>
              </div>
            </Reveal>
          </div>

          <figure>
            <div className="photo-zoom relative overflow-hidden bg-ink">
              <ImageReveal className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                <picture>
                  <source type="image/webp" srcSet={`${w900} 900w, ${w1600} 1600w`} sizes="(min-width: 1024px) 640px, 100vw" />
                  <img src={s1600} srcSet={`${s900} 900w, ${s1600} 1600w`} sizes="(min-width: 1024px) 640px, 100vw" alt="Lane ropes stretched across an indoor swimming pool, in black and white" width={1600} height={1064} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </picture>
              </ImageReveal>
              {/* Slow CSS ripples over the water */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <span className="ripple left-[58%] top-[64%] h-48 w-48" />
                <span className="ripple left-[58%] top-[64%] h-48 w-48" />
                <span className="ripple left-[58%] top-[64%] h-48 w-48" />
              </div>
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-mute">
              <span>Illustrative photograph</span>
              <a className="link-line inline-flex min-h-6 items-center" href="https://commons.wikimedia.org/wiki/File:Swimming_pool_with_lane_ropes_in_place.jpg" target="_blank" rel="noopener noreferrer">Photo: Xander, CC BY 2.0, via Wikimedia Commons (black and white)</a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
