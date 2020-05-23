import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import styled from 'styled-components';
import Game from './Game';
import { Color, generate } from './generate';

const seedStr = (): string =>
  `?seed=${Math.random().toString(36).substring(7)}`;

const Main = styled.main`
  max-width: 600px;
  margin: auto;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 7px;
  margin: 20px auto;
  display: block;
  font-size: 14px;
  font-family: monospace;
`;

const App: React.FC = () => {
  const [width, setWidth] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
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
      <Button type="button" onClick={() => setHidden((v) => !v)}>
        {hidden ? 'Show' : 'Hide'}
      </Button>
      {starter !== null && (
        <div>
          Starter:{' '}
          <span style={{ color: starter }}>
            {starter === Color.BLUE ? 'Blue' : 'Red'}
          </span>
        </div>
      )}
      {seed && game && width && (
        <Game hidden={hidden} game={game} seed={seed} width={width} />
      )}
      <Button type="button" onClick={() => history.push(seedStr())}>
        Generate
      </Button>
    </Main>
  );
};

export default App;
