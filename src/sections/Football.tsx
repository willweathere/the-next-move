import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from '../components/motion'

/* A custom pitch illustration in place of a photograph: pitch lines draw in
   when the section enters view, with a dark monochrome treatment so it reads
   as a graphic rather than a diagram. */

function Pitch({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 600 400"
      className={`h-full w-full ${active ? 'in-view' : ''}`}
      role="img"
      aria-label="Line drawing of a football pitch"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="stripes" width="75" height="400" patternUnits="userSpaceOnUse">
          <rect width="37.5" height="400" fill="rgba(255,255,255,0.025)" />
        </pattern>
      </defs>
      <rect width="600" height="400" fill="#171717" />
      <rect width="600" height="400" fill="url(#stripes)" />
      <g fill="none" stroke="#f5f4f0" strokeWidth="1.6" strokeOpacity="0.85" pathLength="1">
        <rect className="draw" x="30" y="30" width="540" height="340" />
        <line className="draw draw--late" x1="300" y1="30" x2="300" y2="370" />
        <circle className="draw draw--late" cx="300" cy="200" r="56" />
        <rect className="draw draw--late" x="30" y="110" width="90" height="180" />
        <rect className="draw draw--late" x="480" y="110" width="90" height="180" />
        <rect className="draw draw--late" x="30" y="155" width="34" height="90" />
        <rect className="draw draw--late" x="536" y="155" width="34" height="90" />
      </g>
      <circle cx="300" cy="200" r="3" fill="#f5f4f0" />
      <circle cx="98" cy="200" r="3" fill="#f5f4f0" />
      <circle cx="502" cy="200" r="3" fill="#f5f4f0" />
      {/* The ball: one accent on the whole illustration */}
      <circle cx="392" cy="236" r="9" fill="#b4c968" />
    </svg>
  )
}

export default function Football() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <section id="football" className="section bg-paper">
      <div className="wrap">
        <Reveal className="max-w-[900px]">
          <p className="eyebrow">Football</p>
          <h2 className="display mt-5">Leadership is earned<br />on the pitch.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="relative aspect-[3/2] overflow-hidden border border-line-dark bg-ink" as="figure">
            <div ref={ref} className="h-full w-full">
              <Pitch active={inView} />
            </div>
            <figcaption className="absolute bottom-4 left-4 text-[0.66rem] uppercase tracking-[0.18em] text-paper/60">Alexandra United FC</figcaption>
          </Reveal>

          <div className="flex flex-col justify-between gap-10">
            <Reveal delay={0.1}>
              <p className="max-w-[46ch] text-[1.1rem] leading-relaxed text-ink-2">
                I play for Alexandra United FC on Saturdays and Sundays, and I have captained both teams at different points. Two squads, two sets of teammates, one lesson repeated every weekend: a team only works when people talk to each other.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="grid grid-cols-2 border-t border-line">
              <div className="border-r border-line py-6 pr-6">
                <p className="eyebrow">Team one</p>
                <p className="mt-2 font-serif text-3xl">Saturday</p>
              </div>
              <div className="py-6 pl-6">
                <p className="eyebrow">Team two</p>
                <p className="mt-2 font-serif text-3xl">Sunday</p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex items-start gap-5 border border-ink p-6">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center bg-ink font-serif text-lg text-paper" aria-hidden="true">C</span>
              <div>
                <p className="eyebrow">Captaincy</p>
                <p className="mt-1 font-serif text-2xl leading-tight">Captained both teams</p>
                <p className="mt-2 text-[0.95rem] text-ink-2">Teamwork and communication, developed where they matter most.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
