import { ChapterHead, MaskLines, Reveal } from '../components/motion'
import { Open } from '../components/Detail'
import { chapter } from '../content'

const ic = { viewBox: '0 0 48 48', className: 'h-10 w-10', 'aria-hidden': true } as const
const st = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const SUBJECTS = [
  { name: 'Economics', icon: <svg {...ic}><path {...st} d="M8 40h32M8 40V8" /><path {...st} d="M14 32l8-9 6 5 10-13" /><path {...st} d="M32 15h6v6" /></svg> },
  { name: 'Citizenship', icon: <svg {...ic}><path {...st} d="M8 18 24 9l16 9M10 18h28M10 39h28M8 43h32" /><path {...st} d="M14 22v13M21 22v13M27 22v13M34 22v13" /></svg> },
  { name: 'Geography', icon: <svg {...ic}><circle {...st} cx="24" cy="24" r="15" /><path {...st} d="M9 24h30M24 9c5 5 5 25 0 30M24 9c-5 5-5 25 0 30" /></svg> },
  { name: 'Spanish', icon: <svg {...ic}><path {...st} d="M8 12h20v15H17l-6 5v-5H8z" /><path {...st} d="M28 19h12v14h-3v5l-5-5h-4v-6" /></svg> },
]

export default function Education() {
  const c = chapter('education')
  return (
    <section id="education" className="section bg-paper-2">
      <div className="wrap">
        <ChapterHead n={c.n} square={c.square} label={c.label} />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-20">
          <MaskLines className="t-display" lines={['Always', 'learning.']} />
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-3 border-t border-ink">
              <div className="border-r border-line py-5 pr-4">
                <dt className="t-label text-mute">School</dt>
                <dd className="m-0 mt-2"><Open id="school" className="link-line font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight" label="Glyn School. Open details">Glyn School</Open></dd>
              </div>
              <div className="border-r border-line px-4 py-5"><dt className="t-label text-mute">Year</dt><dd className="m-0 mt-2 font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight">Year 10</dd></div>
              <div className="py-5 pl-4"><dt className="t-label text-mute">At Glyn</dt><dd className="m-0 mt-2 font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight">Fourth year</dd></div>
            </dl>
            <p className="mt-5 text-ink-2">Now starting GCSE study in four chosen subjects.</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
          {SUBJECTS.map((s, i) => (
            <Reveal key={s.name} as="li" delay={i * 0.08} className="border-b border-r border-line">
              <Open id={`subject-${s.name.toLowerCase()}`} className="group relative block h-full w-full p-6 transition-colors duration-500 hover:bg-paper sm:p-9" label={`${s.name}, GCSE. Open details`}>
                <span className="t-num t-label block text-mute">0{i + 1}</span>
                <span className="mt-8 block text-ink transition-transform duration-500 group-hover:-translate-y-1">{s.icon}</span>
                <span className="mt-10 block font-serif text-[clamp(1.6rem,2.4vw,2rem)] leading-none">{s.name}</span>
                <span className="mt-4 block h-px w-8 bg-ink/25 transition-all duration-500 group-hover:w-16 group-hover:bg-lime-deep" aria-hidden="true" />
                <span className="t-label mt-3 block text-mute">GCSE</span>
              </Open>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
