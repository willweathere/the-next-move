import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/* The hero chessboard: an 8×8 CSS grid, a handful of SVG pieces, and four
   squares that double as links into the portfolio. The opening choreography
   is CSS: the board fades in, three squares light in sequence, then the
   knight makes one move. Nothing loops. */

export type HotSquare = { square: string; label: string; href: string }

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const HOT: HotSquare[] = [
  { square: 'c6', label: 'Chess', href: '#chess' },
  { square: 'f5', label: 'Football', href: '#football' },
  { square: 'b3', label: 'Refereeing', href: '#refereeing' },
  { square: 'g2', label: 'Experience', href: '#experience' },
]

const LIT = ['d4', 'e5', 'f6']

function Piece({ kind, dark = false }: { kind: 'king' | 'pawn' | 'knight' | 'rook'; dark?: boolean }) {
  const fill = dark ? '#121212' : '#f5f4f0'
  const stroke = dark ? '#f5f4f0' : '#121212'
  const common = { fill, stroke, strokeWidth: 1.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
  switch (kind) {
    case 'king':
      return (
        <svg viewBox="0 0 40 40" className="h-[78%] w-[78%]" aria-hidden="true">
          <path {...common} d="M20 5v6M17 8h6" />
          <path {...common} d="M14 17c-5-5-9 1-5 5 2 2 5 3 5 3h12s3-1 5-3c4-4 0-10-5-5-2-3-5-4-6-4s-4 1-6 4z" />
          <path {...common} d="M12 27h16l1 4H11z" />
          <path {...common} d="M10 33h20v3H10z" />
        </svg>
      )
    case 'pawn':
      return (
        <svg viewBox="0 0 40 40" className="h-[62%] w-[62%]" aria-hidden="true">
          <circle {...common} cx="20" cy="12" r="4.5" />
          <path {...common} d="M15 22c0-4 2-6 5-6s5 2 5 6l2 7H13z" />
          <path {...common} d="M11 31h18v3H11z" />
        </svg>
      )
    case 'rook':
      return (
        <svg viewBox="0 0 40 40" className="h-[70%] w-[70%]" aria-hidden="true">
          <path {...common} d="M12 8h4v3h3V8h2v3h3V8h4v7H12z" />
          <path {...common} d="M14 15h12l-1 13H15z" />
          <path {...common} d="M11 30h18v4H11z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 40 40" className="h-[76%] w-[76%]" aria-hidden="true">
          <path {...common} d="M14 33c0-8 2-12 6-16-2-1-2-4-1-6l3-4c1 1 2 2 4 2 4 2 6 6 6 11 0 6-2 9-3 13z" />
          <path {...common} d="M20 12l-5 7 3 1" />
          <circle cx="24" cy="12" r="1.2" fill={stroke} />
          <path {...common} d="M11 33h18v3H11z" />
        </svg>
      )
  }
}

const INITIAL_PIECES: Record<string, { kind: 'king' | 'pawn' | 'knight' | 'rook'; dark?: boolean }> = {
  e1: { kind: 'king' },
  a1: { kind: 'rook' },
  d2: { kind: 'pawn' },
  g1: { kind: 'knight' },
  e8: { kind: 'king', dark: true },
  h8: { kind: 'rook', dark: true },
  e7: { kind: 'pawn', dark: true },
  c7: { kind: 'pawn', dark: true },
}

/** Square name → grid column/row (rank 8 at the top). */
function pos(square: string) {
  const col = FILES.indexOf(square[0]) + 1
  const row = 9 - Number(square[1])
  return { col, row }
}

export default function Chessboard() {
  const reduce = useReducedMotion()
  const [moved, setMoved] = useState(false)

  // The knight's one move, g1 → f3, after the squares have lit.
  useEffect(() => {
    if (reduce) { setMoved(true); return }
    const t = window.setTimeout(() => setMoved(true), 2600)
    return () => window.clearTimeout(t)
  }, [reduce])

  const knightSquare = moved ? 'f3' : 'g1'
  const pieces = { ...INITIAL_PIECES }
  delete pieces.g1
  const squares: string[] = []
  for (let r = 8; r >= 1; r--) for (const f of FILES) squares.push(`${f}${r}`)

  return (
    <div className={`relative mx-auto w-full max-w-[560px] ${reduce ? '' : 'board-in'}`}>
      <div
        className="relative grid aspect-square w-full grid-cols-8 grid-rows-8 border border-paper/25 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.8)]"
        role="group"
        aria-label="Decorative chessboard. Four squares link to sections of the portfolio."
      >
        {squares.map((sq, i) => {
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
              {i === 0 && null}
            </div>
          )
        })}

        {/* Pieces sit in a second grid layered over the board so the knight can glide. */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8" aria-hidden="true">
          {Object.entries(pieces).map(([sq, p]) => {
            const { col, row } = pos(sq)
            return (
              <div key={sq} className="flex items-center justify-center" style={{ gridColumn: col, gridRow: row }}>
                <Piece kind={p.kind} dark={p.dark} />
              </div>
            )
          })}
          <div
            className="piece-move flex items-center justify-center"
            style={{ gridColumn: pos('g1').col, gridRow: pos('g1').row, transform: moved ? 'translate(-100%, -200%)' : 'none' }}
            data-square={knightSquare}
          >
            <Piece kind="knight" />
          </div>
        </div>
      </div>

      {/* Coordinates, as on a tournament board */}
      <div className="mt-2 grid grid-cols-8 text-center font-sans text-[0.6rem] uppercase tracking-[0.2em] text-mute" aria-hidden="true">
        {FILES.map((f) => <span key={f}>{f}</span>)}
      </div>
    </div>
  )
}

export { HOT }
