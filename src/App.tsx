import Nav from './components/Nav'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Chess from './sections/Chess'
import Football from './sections/Football'
import Refereeing from './sections/Refereeing'
import Swimming from './sections/Swimming'
import DofE from './sections/DofE'
import Writing from './sections/Writing'
import Education from './sections/Education'
import Skills from './sections/Skills'
import { DetailProvider } from './components/Detail'

function SectionMarker({ id, label }: { id: string; label: string }) {
  // Anchor targets for the primary navigation: a quiet running head that
  // groups the sections beneath it.
  return (
    <div id={id} className="scroll-mt-16 border-y border-line bg-paper px-[var(--gutter)]">
      <div className="wrap flex items-center justify-between py-3 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-mute">
        <span>{label}</span>
        <span className="checker h-3 w-16" style={{ ['--s' as string]: '6px', ['--c' as string]: 'rgba(18,18,18,0.35)' }} aria-hidden="true" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <DetailProvider>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <SectionMarker id="achievements" label="Achievements" />
        <Chess />
        <SectionMarker id="experience" label="Experience" />
        <Football />
        <Refereeing />
        <Swimming />
        <DofE />
        <Writing />
        <Education />
        <Skills />
      </main>
      <footer className="border-t border-line bg-paper px-[var(--gutter)] py-10">
        <div className="wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl">The Next Move<span className="text-lime">.</span></p>
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-mute">Every move tells a story.</p>
          <a href="#top" className="link-line text-[0.72rem] font-semibold uppercase tracking-[0.18em]">Back to the board</a>
        </div>
      </footer>
    </DetailProvider>
  )
}
