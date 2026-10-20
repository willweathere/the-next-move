import { LazyMotion, domAnimation } from 'framer-motion'
import Nav from './components/Nav'
import Rail from './components/Rail'
import PartOpener from './components/PartOpener'
import { DetailProvider } from './components/Detail'
import { useWatchSections } from './components/useCurrent'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Chess from './sections/Chess'
import Refereeing from './sections/Refereeing'
import Writing from './sections/Writing'
import Football from './sections/Football'
import Swimming from './sections/Swimming'
import DofE from './sections/DofE'
import Education from './sections/Education'
import Skills from './sections/Skills'
import Closing from './sections/Closing'

/* The page reads as one game record: an opening (hero and about), Part I
   Achievements, Part II Experience, then education and the skills that
   connect everything. */
export default function App() {
  useWatchSections()
  return (
    <LazyMotion features={domAnimation} strict>
      <DetailProvider>
        <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-lime focus:px-4 focus:py-3 focus:text-ink">Skip to content</a>
        <Nav />
        <Rail />
        <main>
          <Hero />
          <Intro />
          <PartOpener id="achievements" numeral="I" part="Achievements" intro="What has been earned so far: tournament qualifications at the chessboard, a refereeing qualification and a place in print." />
          <Chess />
          <Refereeing />
          <Writing />
          <PartOpener id="experience" numeral="II" part="Experience" intro="Commitments kept week after week: on the pitch, at the pool and through the Duke of Edinburgh's Award." />
          <Football />
          <Swimming />
          <DofE />
          <Education />
          <Skills />
        </main>
        <Closing />
      </DetailProvider>
    </LazyMotion>
  )
}
