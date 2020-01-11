import seedrandom from 'seedrandom';
import chunk from 'lodash.chunk';

export enum Color {
  RED = '#DD6363',
  BLUE = '#6388DD',
  YELLOW = '#D8D593',
  BLACK = '#444',
}

export const generate = (seed: string): Color[][] => {
  const rng = seedrandom(seed);
  return chunk(
    [
      rng() < 0.5 ? Color.RED : Color.BLUE,
      ...new Array(8).fill(Color.RED),
      ...new Array(8).fill(Color.BLUE),
      ...new Array(7).fill(Color.YELLOW),
      Color.BLACK,
    ].sort(() => rng() - 0.5),
    5,
  );
};
