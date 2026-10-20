import { CHAPTERS, type Part } from '../content'
import { MaskLines, Reveal } from './motion'

/* Opens a part of the game record (Achievements, Experience) with a large
   title and the moves it contains. It is also the target of the primary
   navigation, so the reader lands on a contents page, not mid-section. */
export default function PartOpener({ id, numeral, part, intro }: { id: string; numeral: string; part: Part; intro: string }) {
  const moves = CHAPTERS.filter((c) => c.part === part)
  return (
    <section id={id} data-part={part} data-nav="dark" className="on-dark grain grain--dark section relative overflow-hidden bg-ink !py-[clamp(4.5rem,8vw,7rem)] text-paper">
      <div className="checker pointer-events-none absolute -right-10 top-0 h-full w-[38%] opacity-70 [mask-image:linear-gradient(to_left,black,transparent)]" style={{ ['--c' as string]: 'rgba(245,244,240,0.035)', ['--s' as string]: '88px' }} aria-hidden="true" />
      <div className="wrap relative grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
        <div>
          <Reveal><p className="t-label text-paper/50">Part {numeral}</p></Reveal>
          <MaskLines className="t-display mt-5" lines={[part + '.']} />
          <Reveal delay={0.15}><p className="t-lead mt-6 max-w-[40ch] text-paper/60">{intro}</p></Reveal>
        </div>
        <Reveal as="ol" delay={0.1} className="border-t border-paper/15">
          {moves.map((c) => (
            <li key={c.id} className="border-b border-paper/15">
              <a href={`#${c.id}`} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5 transition-colors duration-300 hover:text-lime focus-visible:text-lime">
                <span className="t-num text-[0.72rem] font-semibold tracking-[0.14em] text-paper/45">{c.n}</span>
                <span>
                  <span className="block font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">{c.label}</span>
                  <span className="mt-1 block text-[0.95rem] text-paper/55">{c.title}</span>
                </span>
                <svg className="h-3 w-5 translate-x-0 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
