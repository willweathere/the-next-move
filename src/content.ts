/* The portfolio as a game record. Every chapter is a "move" with a number,
   a square on the hero board and a place in one of two parts. Navigation,
   the hero board, the scoresheet rail and the footer index all read from
   this one list, so the structure only has to change here. */

export type Part = 'Opening' | 'Achievements' | 'Experience' | 'Learning'

export type Chapter = {
  id: string
  n: string
  label: string
  /** Short label for tight spaces: the board legend and the scoresheet rail. */
  short: string
  title: string
  part: Part
  /** Square on the hero board. Consecutive squares are a knight's move apart. */
  square: string
}

export const CHAPTERS: Chapter[] = [
  { id: 'about', n: '01', label: 'About', short: 'About', title: 'More than the game.', part: 'Opening', square: 'b1' },
  { id: 'chess', n: '02', label: 'Chess', short: 'Chess', title: 'Think beyond the next move.', part: 'Achievements', square: 'c3' },
  { id: 'refereeing', n: '03', label: 'Refereeing', short: 'Refereeing', title: 'Clarity under pressure.', part: 'Achievements', square: 'e4' },
  { id: 'writing', n: '04', label: 'Published writing', short: 'Writing', title: 'Every story has a voice.', part: 'Achievements', square: 'g5' },
  { id: 'football', n: '05', label: 'Football', short: 'Football', title: 'Leadership is earned on the pitch.', part: 'Experience', square: 'f7' },
  { id: 'swimming', n: '06', label: 'Swimming', short: 'Swimming', title: 'Consistency creates trust.', part: 'Experience', square: 'd6' },
  { id: 'dofe', n: '07', label: 'Duke of Edinburgh', short: 'DofE', title: 'Progress is built through commitment.', part: 'Experience', square: 'b7' },
  { id: 'education', n: '08', label: 'Education', short: 'Education', title: 'Always learning.', part: 'Learning', square: 'a5' },
  { id: 'skills', n: '09', label: 'Transferable skills', short: 'Skills', title: 'Different experiences. Shared skills.', part: 'Learning', square: 'c4' },
]

export const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!

/** Primary navigation: the brief's four items, in the order the page reads. */
export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
]
