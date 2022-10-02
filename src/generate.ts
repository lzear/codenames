import seedrandom from 'seedrandom'
import chunk from 'lodash.chunk'

export enum Color {
  RED = '#DD6363',
  BLUE = '#6388DD',
  YELLOW = '#D8D593',
  BLACK = '#444',
}

export const generate = (seed: string): Color[][] => {
  const rng = seedrandom(seed)
  return chunk(
    [
      rng() < 0.5 ? Color.RED : Color.BLUE,
      ...(Array.from({ length: 8 }).fill(Color.RED) as Color[]),
      ...(Array.from({ length: 8 }).fill(Color.BLUE) as Color[]),
      ...(Array.from({ length: 7 }).fill(Color.YELLOW) as Color[]),
      Color.BLACK,
    ].sort(() => rng() - 0.5),
    5,
  )
}
