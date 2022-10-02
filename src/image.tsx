import React, { useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from '@use-gesture/react'
import { Color } from './generate'
import { Tiles } from './game'

const Image: React.FC<{
  game: Color[][]
  width: number
  hidden: boolean
  locked: boolean
  img: string
  seed: string
}> = ({ seed, game, width, hidden, img, locked }) => {
  const [{ x, y, scale, rotateZ }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
    immediate: true,
    config: {
      duration: 0,
    },
  }))
  const v0 = useRef(0)
  const bind = useGesture(
    {
      onDrag: ({ offset: [xx, yy] }) => set({ x: xx, y: yy }),
      onPinchStart: (state) => {
        v0.current = scale.get() / state.offset[0]
      },
      onWheel: (state) => {
        set({
          // rotateZ: state.offset[1],
          scale: scale.get() * (1 - state.delta[1] * 0.001),
        })
      },
      onPinch: ({ offset }) => {
        set({
          rotateZ: offset[1],
          scale: offset[0] * v0.current,
        })
      },
    },
    {
      // target: typeof window !== 'undefined' ? window : undefined,
      drag: { delay: 0 },
    },
  )
  console.log('%c antoinelog bind', 'background: #222; color: #bada55', bind)

  return (
    <>
      {img ? (
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
      ) : null}
      <div
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
  )
}

export default Image
