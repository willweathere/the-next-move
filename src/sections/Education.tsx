import { Reveal } from '../components/motion'

const SUBJECTS = [
  {
    name: 'Economics',
    icon: <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true"><path d="M8 38h32M12 32l8-10 7 6 9-12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="36" cy="16" r="2" fill="currentColor" /></svg>,
  },
  {
    name: 'Citizenship',
    icon: <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true"><path d="M10 40V22l14-10 14 10v18zM18 40V30h12v10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M24 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  },
  {
    name: 'Geography',
    icon: <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M9 24h30M24 9c5 5 5 25 0 30M24 9c-5 5-5 25 0 30" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>,
  },
  {
    name: 'Spanish',
    icon: <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true"><path d="M8 12h20v16H18l-6 5v-5H8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M28 20h12v14h-4v4l-5-4h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  },
]

export default function Education() {
  return (
    <section id="education" className="section bg-paper">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Education</p>
            <h2 className="display mt-5">Always learning.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-14">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-3">
              <div><dt className="eyebrow">School</dt><dd className="mt-1 font-serif text-2xl">Glyn School</dd></div>
              <div><dt className="eyebrow">Year</dt><dd className="mt-1 font-serif text-2xl">Year 10</dd></div>
              <div><dt className="eyebrow">At Glyn</dt><dd className="mt-1 font-serif text-2xl">Fourth year</dd></div>
            </dl>
            <p className="mt-6 max-w-[52ch] text-ink-2">Now starting GCSE study in four chosen subjects.</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
          {SUBJECTS.map((s, i) => (
            <Reveal key={s.name} as="li" delay={i * 0.08} className="group border-b border-r border-line p-7 transition-colors duration-500 hover:bg-paper-2 sm:p-9">
              <span className="block text-ink transition-transform duration-500 group-hover:-translate-y-1">{s.icon}</span>
              <p className="mt-10 font-serif text-[1.7rem] leading-none">{s.name}</p>
              <span className="mt-4 block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-lime-deep" aria-hidden="true" />
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-mute">GCSE</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
