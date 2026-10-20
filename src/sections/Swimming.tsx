import { Reveal } from '../components/motion'

const YEARS = ['Year one', 'Year two', 'Year three', 'Year four']

export default function Swimming() {
  return (
    <section id="swimming" className="section bg-paper">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Swimming</p>
              <h2 className="display mt-5">Consistency<br />creates trust.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[46ch] text-[1.1rem] leading-relaxed text-ink-2">
                Four years as a swimming helper, developing reliability, consistency and a commitment to supporting others.
              </p>
              <p className="mt-4 max-w-[46ch] text-ink-2/80">
                Turning up every week, year after year, is its own kind of achievement. People learn they can rely on you.
              </p>
            </Reveal>

            {/* Four-year timeline */}
            <Reveal delay={0.15} className="mt-12">
              <ol className="relative grid grid-cols-4 gap-2">
                <span className="absolute left-0 right-0 top-[5px] h-px bg-water/50" aria-hidden="true" />
                {YEARS.map((y, i) => (
                  <li key={y} className="relative pt-6">
                    <span className={`absolute left-0 top-0 h-[11px] w-[11px] rounded-full border border-water ${i === 3 ? 'bg-water' : 'bg-paper'}`} aria-hidden="true" />
                    <p className="font-serif text-2xl">0{i + 1}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-mute">{y}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.1} as="figure" className="relative overflow-hidden border border-line">
            <img
              src="/img/swimming.jpg"
              alt="Lane ropes stretched across an empty swimming pool"
              className="photo--tint aspect-[4/3] w-full object-cover"
              width="1600"
              height="1064"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            {/* Ripples sit over the image and still read on their own if the photo is unavailable. */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(142,160,168,0.18),transparent_60%)]" aria-hidden="true">
              <span className="ripple left-[62%] top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2" />
              <span className="ripple left-[62%] top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2" />
              <span className="ripple left-[62%] top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <figcaption className="flex items-center justify-between px-4 py-3 text-[0.66rem] uppercase tracking-[0.16em] text-mute">
              <span>Four years poolside</span>
              <span>Photo: Wikimedia Commons, CC BY 2.0</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
