import { CHAPTERS } from '../content'
import { MaskLines, Reveal } from '../components/motion'

/* The end of the record: the title again, the full index of moves and the
   image credits. No contact details are published, by design. */
export default function Closing() {
  return (
    <footer data-nav="dark" className="on-dark relative overflow-hidden border-t border-paper/10 bg-ink px-[var(--gutter)] pb-10 pt-20 text-paper sm:pt-28">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal><p className="t-label text-paper/45">End of the record</p></Reveal>
            <MaskLines as="p" className="t-hero mt-6 text-[clamp(3.4rem,8.5vw,7.5rem)]" lines={['THE NEXT', <span key="m" className="text-lime">MOVE.</span>]} />
            <Reveal delay={0.1}><p className="mt-6 font-serif text-[1.6rem] italic text-paper/70">Every move tells a story.</p></Reveal>
          </div>
          <Reveal delay={0.1} as="div">
            <nav aria-label="Index">
              <p className="t-label text-paper/45">Index</p>
              <ol className="mt-5 grid grid-cols-1 border-t border-paper/15 xs:grid-cols-2 xs:gap-x-8">
                {CHAPTERS.map((c) => (
                  <li key={c.id} className="border-b border-paper/15">
                    <a href={`#${c.id}`} className="group flex min-h-12 items-center gap-4 py-2 text-paper/70 transition-colors hover:text-paper">
                      <span className="t-num text-[0.68rem] font-semibold tracking-[0.12em] text-paper/35 transition-colors group-hover:text-lime">{c.n}</span>
                      {c.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-paper/15 pt-6 text-[0.72rem] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Photography: <a className="link-line text-paper/70" href="https://commons.wikimedia.org/wiki/File:Adidas_soccer_ball_on_a_grass_pitch_(Unsplash).jpg" target="_blank" rel="noopener noreferrer">Peter Glaser (CC0)</a> and <a className="link-line text-paper/70" href="https://commons.wikimedia.org/wiki/File:Swimming_pool_with_lane_ropes_in_place.jpg" target="_blank" rel="noopener noreferrer">Xander (CC BY 2.0)</a>, both converted to black and white. Illustrations are original.</p>
          <a href="#top" className="link-line t-label inline-flex min-h-11 items-center self-start text-paper/80 sm:self-auto">Back to the board</a>
        </div>
      </div>
    </footer>
  )
}
