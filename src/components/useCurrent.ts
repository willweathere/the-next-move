import { useEffect, useSyncExternalStore } from 'react'

/* Which section owns the middle of the viewport, and whether the strip
   under the navigation bar is over a dark section. One observer for the
   whole page; components subscribe to the result. */

type State = { current: string; dark: boolean }
let state: State = { current: 'top', dark: true }
const subs = new Set<() => void>()
const set = (next: Partial<State>) => {
  const s = { ...state, ...next }
  if (s.current === state.current && s.dark === state.dark) return
  state = s
  subs.forEach((f) => f())
}

export function useWatchSections() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('main [id]')).filter((e) => e.tagName === 'SECTION' || e.dataset.part)
    const mid = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) set({ current: e.target.id }) }),
      { rootMargin: '-45% 0px -54% 0px' },
    )
    els.forEach((e) => mid.observe(e))

    const darks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]'))
    const hits = new Set<Element>()
    const top = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? hits.add(e.target) : hits.delete(e.target)))
        set({ dark: hits.size > 0 })
      },
      { rootMargin: '0px 0px -92% 0px' },
    )
    darks.forEach((e) => top.observe(e))
    return () => { mid.disconnect(); top.disconnect() }
  }, [])
}

export function useCurrent() {
  return useSyncExternalStore(
    (f) => { subs.add(f); return () => subs.delete(f) },
    () => state,
    () => state,
  )
}
