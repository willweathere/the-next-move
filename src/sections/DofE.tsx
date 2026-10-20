import { ChapterHead, MaskLines, Reveal, useShown } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'

const icon = 'h-10 w-10'
const PARTS = [
  {
    k: 'Volunteering', v: 'Helping coach younger children.',
    icon: <svg viewBox="0 0 48 48" className={icon} aria-hidden="true"><circle cx="18" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="32" cy="18" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 38c0-8 4-13 10-13s10 5 10 13M26 38c0-6 2-10 6-10s6 4 6 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
  {
    k: 'Skills', v: 'Chess.',
    icon: <svg viewBox="0 0 48 48" className={icon} aria-hidden="true"><rect x="8" y="8" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 24h32M24 8v32" stroke="currentColor" strokeWidth="1.5" /><path d="M8 8h16v16H8zM24 24h16v16H24z" fill="currentColor" fillOpacity="0.85" /></svg>,
  },
  {
    k: 'Physical', v: 'Football.',
    icon: <svg viewBox="0 0 48 48" className={icon} aria-hidden="true"><circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M24 15.5l6.5 4.7-2.5 7.6h-8l-2.5-7.6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M24 15.5V9M30.5 20.2l6-2M28 27.8l3.8 5.4M20 27.8l-3.8 5.4M17.5 20.2l-6-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
]

export default function DofE() {
  const c = chapter('dofe')
  const [route, drawn] = useShown<HTMLDivElement>('0px 0px -20% 0px')
  return (
    <section id="dofe" className="section bg-paper">
      <div className="wrap">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <MaskLines className="t-display" lines={['Progress is built', 'through commitment.']} />
          <Reveal delay={0.1}>
            <p className="t-label text-lime-deep">Bronze level</p>
            <p className="t-lead measure mt-3 text-ink-2">
              My Bronze Duke of Edinburgh&rsquo;s Award experience draws on three parts of this portfolio: volunteering by helping to coach younger children, chess for the skills section and football for the physical section.
            </p>
          </Reveal>
        </div>

        <div ref={route} className={`relative mt-16 sm:mt-20 ${drawn ? 'in-view' : ''}`}>
          {/* The route that joins the three sections: horizontal on desktop, vertical on phones */}
          <svg className="pointer-events-none absolute left-0 top-[7px] hidden h-[2px] w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#d9d8d2" strokeWidth="2" />
            <line className="draw" pathLength={1} x1="0" y1="1" x2="100" y2="1" stroke="#8fa448" strokeWidth="2" />
          </svg>
          <svg className="pointer-events-none absolute bottom-6 left-[7px] top-0 w-[2px] md:hidden" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="1" y1="0" x2="1" y2="100" stroke="#d9d8d2" strokeWidth="2" />
            <line className="draw" pathLength={1} x1="1" y1="0" x2="1" y2="100" stroke="#8fa448" strokeWidth="2" />
          </svg>

          <ol className="grid grid-cols-1 md:grid-cols-3">
            {PARTS.map((p, i) => (
              <Reveal key={p.k} as="li" delay={0.2 + i * 0.15} className="relative pb-12 pl-12 last:pb-0 md:pb-0 md:pl-0 md:pr-10">
                <span className={`absolute left-0 top-0 grid h-4 w-4 place-items-center border-2 border-ink transition-colors duration-500 md:left-0 ${drawn ? 'bg-lime' : 'bg-paper'}`} style={{ transitionDelay: drawn ? `${0.4 + i * 0.5}s` : '0s' }} aria-hidden="true" />
                <Open id={`dofe-${p.k.toLowerCase()}`} className="group block w-full text-left md:pt-14" label={`${p.k}: ${p.v} Open details`}>
                  <span className="t-num t-label block text-mute">Section 0{i + 1}</span>
                  <span className="mt-6 block text-ink transition-transform duration-500 group-hover:-translate-y-1">{p.icon}</span>
                  <span className="t-label mt-6 block">{p.k}</span>
                  <span className="mt-2 block font-serif text-[clamp(1.9rem,2.8vw,2.5rem)] leading-[1.05]">{p.v}</span>
                  <span className="t-label mt-5 flex items-center gap-2 text-mute transition-colors group-hover:text-ink">
                    More
                    <svg className="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  </span>
                </Open>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
