import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { History } from 'history';
import styled from 'styled-components';
import Image from './Image';
import { Tiles } from './Game';
import { Color, generate } from './generate';

const seedStr = (): string =>
  `?seed=${Math.random().toString(36).substring(7)}`;

const Main = styled.main`
  position: relative;
  max-width: 600px;
  margin: auto;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
`;
const Actions = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const Button = styled.button`
  padding: 7px;
  font-size: 14px;
  font-family: monospace;
`;

const App: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const [lockImg, setLockImg] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const history: History = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const seed = urlParams.get('seed');
  useEffect(() => {
    if (!seed) history.replace(seedStr());
  }, [seed, history]);
  useEffect(() => {
    const handleResize = (): void => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const game: Color[][] | null = useMemo<Color[][] | null>(
    () => (seed ? generate(seed) : null),
    [seed],
  );
  let starter: Color.BLUE | Color.RED | null = null;
  if (game)
    starter =
      game.flat().filter((color) => color === Color.BLUE).length === 9
        ? Color.BLUE
        : Color.RED;
  return (
    <Main ref={ref}>
      <Actions>
        <Button type="button" onClick={() => setHidden((v) => !v)}>
          {hidden ? 'Show' : 'Hide'}
        </Button>
      </Actions>
      {starter !== null && (
        <div>
          Starter:{' '}
          <span style={{ color: starter }}>
            {starter === Color.BLUE ? 'Blue' : 'Red'}
          </span>
        </div>
      )}
      {seed &&
        game &&
        width &&
        (img ? (
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
        ))}
      <Actions style={{ marginTop: 80 }}>
        <Button
          type="button"
          onClick={() => history.push(seedStr())}
          style={{ marginRight: 25 }}
        >
          New game
        </Button>
        {img && (
          <Button
            type="button"
            onClick={() => setLockImg((v) => !v)}
            style={{ marginRight: 25 }}
          >
            {lockImg ? 'Move image' : 'Lock image'}
          </Button>
        )}
        <input
          hidden
          ref={fileInput}
          type="file"
          value=""
          onChange={(e) => {
            const reader = new FileReader();
            const { files } = e.target;
            if (!files) return;
            const file = files[0];
            reader.onloadend = () => {
              if (reader.result) {
                // @ts-ignore
                setImg(reader.result);
              }
            };
            reader.readAsDataURL(file);
          }}
        />
        <label htmlFor="use-image">
          <input
            id="use-image"
            checked={!!img}
            type="checkbox"
            onChange={() => {
              if (!img && fileInput.current) fileInput.current.click();
              else setImg(null);
            }}
          />{' '}
          Use image
        </label>
      </Actions>
      <div style={{ textAlign: 'right' }}>
        <a href="https://github.com/lzear/codenames">
          <img
            alt="star this repo"
            src="https://img.shields.io/github/stars/lzear/codenames?style=social"
          />
        </a>
      </div>
    </Main>
  );
};

export default withRouter(App);
