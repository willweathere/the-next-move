import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CHAPTERS } from '../content'

/* The hero board, built with CSS 3D transforms (no WebGL). It is a plain
   8×8 board seen at an angle. Nine squares, one per chapter, rise as
   blocks in the order of the portfolio, and a fine lime line traces the
   route between them. Each step of that route is a legal knight's move:
   the portfolio read as one game. Every block is a real link. */

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const centre = (sq: string) => ({ x: FILES.indexOf(sq[0]) + 0.5, y: 8 - Number(sq[1]) + 0.5 })
const ROUTE = CHAPTERS.map((c) => centre(c.square))
/* The route runs between blocks, never underneath them: each segment
   stops just short of the block at either end (blocks fill the middle
   68% of a square). One path of separate segments, so it draws as one. */
const TRIM = 0.4
const ROUTE_D = ROUTE.slice(1).map((b, i) => {
  const a = ROUTE[i]
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy)
  const ux = (dx / len) * TRIM, uy = (dy / len) * TRIM
  return `M${(a.x + ux).toFixed(3)} ${(a.y + uy).toFixed(3)}L${(b.x - ux).toFixed(3)} ${(b.y - uy).toFixed(3)}`
}).join('')

type Props = { active: string | null; onActive: (id: string | null) => void }

export default function Board3D({ active, onActive }: Props) {
  const reduce = useReducedMotion()
  const stage = useRef<HTMLDivElement>(null)
  const [intro] = useState(() => !reduce)

  // A few degrees of tilt that follows a fine pointer. Desktop only, and
  // never under reduced motion. One rAF per frame, transforms only.
  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = stage.current
    const hero = el?.closest('section')
    if (!el || !hero) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      // Hold still while the pointer is over the board, so targets never move under it.
      const b = el.parentElement!.getBoundingClientRect()
      if (e.clientX > b.left && e.clientX < b.right && e.clientY > b.top && e.clientY < b.bottom) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--rz', `${-32 + px * 7}deg`)
        el.style.setProperty('--rx', `${54 - py * 6}deg`)
      })
    }
    const onLeave = () => { el.style.removeProperty('--rz'); el.style.removeProperty('--rx') }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => { cancelAnimationFrame(raf); hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave) }
  }, [reduce])

  const squares: string[] = []
  for (let r = 8; r >= 1; r--) for (const f of FILES) squares.push(`${f}${r}`)

  return (
    <div className={`b3-stage pointer-events-none relative mx-auto w-full ${intro ? 'b3-intro' : ''}`}>
      {/* The projected board is wider than it is tall: the frame keeps its footprint predictable. */}
      <div className="relative mx-auto aspect-[1/0.64] w-full">
        <div ref={stage} className="absolute left-1/2 top-[50%] w-[68%] -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="b3-board grid grid-cols-8 grid-rows-8"
            role="group"
            aria-label="Chessboard map of the portfolio. Nine squares link to its chapters."
          >
            {squares.map((sq) => {
              const f = FILES.indexOf(sq[0])
              const dark = (f + Number(sq[1])) % 2 === 0
              const ch = CHAPTERS.find((c) => c.square === sq)
              const tone = dark ? 'b3-sq--d' : 'b3-sq--l'
              if (!ch) return <div key={sq} className={`b3-sq ${tone}`} aria-hidden="true" />
              const i = CHAPTERS.indexOf(ch)
              const on = active === ch.id
              return (
                <a
                  key={sq}
                  href={`#${ch.id}`}
                  className={`b3-sq b3-hot ${tone} ${on ? 'is-on' : ''}`}
                  aria-label={`${ch.n}, ${ch.label}`}
                  onMouseEnter={() => onActive(ch.id)}
                  onMouseLeave={() => onActive(null)}
                  onFocus={() => onActive(ch.id)}
                  onBlur={() => onActive(null)}
                  style={{ ['--i' as string]: i }}
                >
                  <span className="b3-blk" aria-hidden="true">
                    <span className="b3-face b3-n" />
                    <span className="b3-face b3-w" />
                    <span className="b3-face b3-e" />
                    <span className="b3-face b3-s" />
                    <span className="b3-face b3-top t-num">{ch.n}</span>
                  </span>
                </a>
              )
            })}

            <svg className="b3-route" viewBox="0 0 8 8" aria-hidden="true">
              <path
                className="draw"
                pathLength={1}
                d={ROUTE_D}
                fill="none"
                stroke="#b4c968"
                strokeWidth="0.045"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            <span className="b3-edge b3-edge--n" aria-hidden="true" />
            <span className="b3-edge b3-edge--w" aria-hidden="true" />
            <span className="b3-edge b3-edge--e" aria-hidden="true" />
            <span className="b3-edge b3-edge--s" aria-hidden="true" />
          </div>
        </div>
        {/* Soft contact shadow under the board */}
        <div className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[34%] w-[78%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-3xl" aria-hidden="true" />
      </div>
    </div>
  )
}
