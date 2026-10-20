import { ChapterHead, ImageReveal, MaskLines, Reveal, useShown } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'
import f900 from '../assets/img/football-900.jpg'
import f1600 from '../assets/img/football-1600.jpg'
import f2400 from '../assets/img/football-2400.jpg'
import w900 from '../assets/img/football-900.webp'
import w1600 from '../assets/img/football-1600.webp'
import w2400 from '../assets/img/football-2400.webp'

export default function Football() {
  const c = chapter('football')
  const [lines, drawn] = useShown<HTMLDivElement>('0px 0px -25% 0px')
  return (
    <section id="football" className="section bg-paper">
      <div className="wrap">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <MaskLines className="t-display" lines={['Leadership is earned', 'on the pitch.']} />
          <Reveal delay={0.1}>
            <p className="t-lead measure text-ink-2">
              I play for Alexandra United FC on Saturdays and Sundays, and I have captained both teams at different points. Two squads, two sets of teammates, one lesson repeated every weekend: a team only works when people talk to each other.
            </p>
          </Reveal>
        </div>

        <figure className="mt-14 sm:mt-16">
          <div className="photo-zoom relative overflow-hidden bg-ink">
            <ImageReveal className="aspect-[4/3] sm:aspect-[2/1]">
              <picture>
                <source type="image/webp" srcSet={`${w900} 900w, ${w1600} 1600w, ${w2400} 2400w`} sizes="(min-width: 1240px) 1240px, 100vw" />
                <img
                  src={f1600}
                  srcSet={`${f900} 900w, ${f1600} 1600w, ${f2400} 2400w`}
                  sizes="(min-width: 1240px) 1240px, 100vw"
                  alt="A football resting on a grass pitch, in black and white"
                  width={1600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_60%]"
                />
              </picture>
            </ImageReveal>
            {/* Pitch lines draw across the photograph when it is in view */}
            <div ref={lines} className={`pointer-events-none absolute inset-0 ${drawn ? 'in-view' : ''}`} aria-hidden="true">
              <svg className="h-full w-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <g fill="none" stroke="#f5f4f0" strokeOpacity="0.55" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
                  <line className="draw" pathLength={1} x1="0" y1="440" x2="1000" y2="440" vectorEffect="non-scaling-stroke" style={{ ['--d' as string]: '0.6s' }} />
                  <line className="draw" pathLength={1} x1="740" y1="0" x2="740" y2="500" vectorEffect="non-scaling-stroke" style={{ ['--d' as string]: '0.9s' }} />
                </g>
                <line className="draw" pathLength={1} x1="0" y1="440" x2="340" y2="440" stroke="#b4c968" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ ['--d' as string]: '1.4s' }} />
              </svg>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-4 left-4 t-label text-paper/80 sm:bottom-6 sm:left-6">Alexandra United FC &middot; Saturday &amp; Sunday</p>
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-mute">
            <span>Illustrative photograph, not the club or its players</span>
            <span>Photo: Peter Glaser, CC0, via Wikimedia Commons</span>
          </figcaption>
        </figure>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal className="grid grid-cols-2 border-y border-ink">
            <Open id="team-saturday" className="group border-r border-line py-7 pr-6 transition-colors duration-300 hover:bg-paper-2 sm:py-9" label="Saturday team. Open details">
              <span className="t-label block text-mute">Team one</span>
              <span className="mt-2 block font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-tight">Saturday</span>
            </Open>
            <Open id="team-sunday" className="group py-7 pl-6 transition-colors duration-300 hover:bg-paper-2 sm:py-9" label="Sunday team. Open details">
              <span className="t-label block text-mute">Team two</span>
              <span className="mt-2 block font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-tight">Sunday</span>
            </Open>
          </Reveal>

          <Reveal delay={0.1}>
            <Open id="captaincy" className="group flex h-full w-full items-center gap-6 bg-ink p-6 text-paper transition-colors duration-300 sm:p-8" label="Captained both teams. Open details">
              {/* The armband: the one accent in this chapter */}
              <span className="grid h-16 w-16 shrink-0 place-items-center bg-lime font-serif text-3xl text-ink transition-transform duration-500 group-hover:-rotate-6" aria-hidden="true">C</span>
              <span>
                <span className="t-label block text-paper/50">Captaincy</span>
                <span className="mt-1 block font-serif text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight">Captained both teams</span>
                <span className="mt-2 block text-[0.95rem] text-paper/65">Teamwork and communication, developed where they matter most.</span>
              </span>
            </Open>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
