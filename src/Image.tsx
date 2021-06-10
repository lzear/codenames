import React from 'react';
import { useSpring, animated } from 'react-spring';
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
  const [{ x, y, scale, rotateZ }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
    immediate: true,
  }));
  const bind = useGesture(
    {
      onDrag: ({ offset: [xx, yy] }) => set({ x: xx, y: yy }),
      onPinch: ({ offset }) => {
        set({
          rotateZ: offset[1],
          scale: offset[0] / 100,
        });
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
            scale,
            rotateZ,
            x,
            y,
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
