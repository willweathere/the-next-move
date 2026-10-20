import { useReducedMotion } from 'framer-motion'

/* The hero chessboard: an 8×8 CSS grid with four squares that double as
   links into the portfolio. The opening choreography is CSS only: the board
   fades in, then three squares light in sequence. No pieces, nothing loops. */

export type HotSquare = { square: string; label: string; href: string }

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const HOT: HotSquare[] = [
  { square: 'c6', label: 'Chess', href: '#chess' },
  { square: 'f5', label: 'Football', href: '#football' },
  { square: 'b3', label: 'Refereeing', href: '#refereeing' },
  { square: 'g2', label: 'Experience', href: '#experience' },
]

const LIT = ['d4', 'e5', 'f6']

export default function Chessboard() {
  const reduce = useReducedMotion()
  const squares: string[] = []
  for (let r = 8; r >= 1; r--) for (const f of FILES) squares.push(`${f}${r}`)

  return (
    <div className={`relative mx-auto w-full max-w-[560px] ${reduce ? '' : 'board-in'}`}>
      <div
        className="relative grid aspect-square w-full grid-cols-8 grid-rows-8 border border-paper/25 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.8)]"
        role="group"
        aria-label="Decorative chessboard. Four squares link to sections of the portfolio."
      >
        {squares.map((sq) => {
          const file = FILES.indexOf(sq[0])
          const rank = Number(sq[1])
          const dark = (file + rank) % 2 === 0
          const hot = HOT.find((h) => h.square === sq)
          const litIndex = LIT.indexOf(sq)
          const base = dark ? 'bg-[#1f1f1d]' : 'bg-ivory'
          if (hot) {
            return (
              <a
                key={sq}
                href={hot.href}
                className={`group relative ${base} outline-offset-[-3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-deep`}
                aria-label={`Go to ${hot.label}`}
              >
                <span className="absolute inset-0 bg-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dark ? 'bg-ivory/70' : 'bg-ink/50'} transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0`} />
                <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-ink px-2 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-paper opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[0.66rem]">
                  {hot.label}
                </span>
              </a>
            )
          }
          return (
            <div key={sq} className={`relative ${base}`} aria-hidden="true">
              {litIndex > -1 && !reduce && (
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 10 10" preserveAspectRatio="none">
                  <rect className="sq-lit" width="10" height="10" style={{ animationDelay: `${0.9 + litIndex * 0.45}s` }} />
                </svg>
              )}
            </div>
          )
        })}
      </div>

      {/* Coordinates, as on a tournament board */}
      <div className="mt-2 grid grid-cols-8 text-center font-sans text-[0.6rem] uppercase tracking-[0.2em] text-mute" aria-hidden="true">
        {FILES.map((f) => <span key={f}>{f}</span>)}
      </div>
    </div>
  )
}

export { HOT }
