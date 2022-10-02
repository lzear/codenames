import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from './image'
import { Tiles } from './game'
import { Color, generate } from './generate'
import { Main, Button, Actions } from './components/components'
import { onFileChange, seedString as seedString, useSeed } from './helpers'

const ghLink = (
  <div style={{ textAlign: 'right', flex: 0, margin: '15px 0' }}>
    <a href="https://github.com/lzear/codenames">
      <img width={20} alt="star this repo" src="/github.svg" />
    </a>
  </div>
)

const App: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [img, setImg] = useState<string | null>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [hidden, setHidden] = useState(false)
  const [lockImg, setLockImg] = useState(false)
  const reference = useRef<HTMLDivElement>(null)
  const [navigate, seed] = useSeed()

  useEffect(() => {
    const handleResize = (): void => {
      if (reference.current) setWidth(reference.current.offsetWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const game: Color[][] | null = useMemo<Color[][] | null>(
    () => (seed ? generate(seed) : null),
    [seed],
  )

  let starter: Color.BLUE | Color.RED | null = null
  if (game)
    starter =
      game.flat().filter((color) => color === Color.BLUE).length === 9
        ? Color.BLUE
        : Color.RED
  return (
    <Main ref={reference}>
      <div style={{ flex: 1, position: 'relative', touchAction: 'none' }}>
        <Actions>
          <Button type="button" onClick={() => setHidden((v) => !v)}>
            {hidden ? 'Show' : 'Hide'}
          </Button>
        </Actions>
        {starter !== null && (
          <div style={{ marginBottom: 10 }}>
            Starter:{' '}
            <span style={{ color: starter }}>
              {starter === Color.BLUE ? 'Blue' : 'Red'}
            </span>
          </div>
        )}
        {seed && game && width ? (
          img ? (
            <Image
              seed={seed}
              hidden={hidden}
              game={game}
              width={width}
              img={img}
              locked={lockImg}
            />
          ) : (
            <Tiles seed={seed} hidden={hidden} game={game} width={width} />
          )
        ) : null}
        <Actions style={{ marginTop: 80 }}>
          <Button
            type="button"
            onClick={() => navigate(seedString())}
            style={{ marginRight: 25 }}
          >
            New game
          </Button>
          {img ? (
            <Button
              type="button"
              onClick={() => setLockImg((v) => !v)}
              style={{ marginRight: 25 }}
            >
              {lockImg ? 'Move image' : 'Lock image'}
            </Button>
          ) : null}
          <input
            hidden
            accept="image/*"
            ref={fileInput}
            type="file"
            value=""
            onChange={async (event) => setImg(await onFileChange(event))}
          />
          <label htmlFor="use-image">
            <input
              id="use-image"
              checked={!!img}
              type="checkbox"
              onChange={() => {
                if (!img && fileInput.current) fileInput.current.click()
                else setImg(null)
              }}
            />{' '}
            Use image
          </label>
        </Actions>
      </div>
      {ghLink}
    </Main>
  )
}

export default App
