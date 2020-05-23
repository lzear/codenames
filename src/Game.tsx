import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from './generate';

export const Row = styled.div`
  display: flex;
  justify-content: center;
`;
export const CardDiv = styled.div<{
  cardColor: Color;
  width: number;
  found: boolean;
}>`
  height: ${({ width }) => width * 0.618}px;
  width: ${({ width }) => width}px;
  background: ${({ cardColor }) => cardColor};
  opacity: ${({ found }) => (found ? 0.15 : 1)};
  margin: 5px;
  padding: 5px;
`;

const Card: React.FC<{ cardColor: Color; width: number }> = ({
  cardColor,
  width,
}) => {
  const [found, setFound] = useState(false);
  return (
    <CardDiv
      cardColor={cardColor}
      width={width}
      found={found}
      onClick={() => setFound((v) => !v)}
    />
  );
};

const Container = styled.div<{ isHidden: boolean }>`
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
  margin: 0 -6px;
`;
const Game: React.FC<{
  game: Color[][];
  seed: string;
  width: number;
  hidden: boolean;
}> = ({ game, seed, width, hidden }) => (
  <Container isHidden={hidden}>
    {game.map((row, key1) => (
      // eslint-disable-next-line react/no-array-index-key
      <Row key={key1}>
        {row.map((color, key2) => (
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={seed + key2}
            cardColor={color}
            width={Math.floor(width / 5) - 6}
          />
        ))}
      </Row>
    ))}
  </Container>
);

export default Game;
