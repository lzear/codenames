import React from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { Color } from './generate';
import { Tiles } from './Game';

const Image: React.FC<{
  game: Color[][];
  width: number;
  hidden: boolean;
  locked: boolean;
  img: string;
  seed: string;
}> = ({ seed, game, width, hidden, img, locked }) => {
  const [{ x, y, size, angle }, set] = useSpring<{
    x: number;
    y: number;
    size: number;
    angle: number;
  }>(() => ({
    x: 0,
    y: 0,
    size: 1,
    angle: 0,
  }));
  const bind = useGesture(
    {
      onDrag: ({ offset: [xx, yy] }) => set({ x: xx, y: yy }),
      onPinch: ({ memo, first, da }) => {
        if (first) {
          return [
            da[0] ? size.getValue() / da[0] : size.getValue(),
            angle.getValue() - da[1],
          ];
        }
        set({
          angle: memo[1] + da[1],
          size: da[0] * memo[0],
        });
        return memo;
      },
    },
    { drag: { delay: 0 } },
  );
  return (
    <>
      {img && (
        <animated.img
          // @ts-ignore
          src={img}
          alt="Your content"
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: -1,
            touchAction: 'none',
            transform: interpolate(
              [x, y, angle, size],
              (xx, yy, aa, s) =>
                `translate3d(${xx}px,${yy}px,0) rotate(${aa}deg) scale(${s})`,
            ),
          }}
        />
      )}
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(locked ? {} : bind())}
        style={{
          userSelect: 'none',
          zIndex: 2,
          touchAction: locked ? 'inherit' : 'none',
        }}
      >
        <Tiles
          hidden={hidden}
          game={game}
          width={width}
          imgMode
          disabled={!locked}
          seed={seed}
        />
      </div>
    </>
  );
};

export default Image;
