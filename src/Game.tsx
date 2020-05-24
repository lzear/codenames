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
  imgMode: boolean;
}>`
  height: ${({ width }) => width * 0.618}px;
  width: ${({ width }) => width}px;
  background: ${({ cardColor, imgMode, found }) =>
    found || !imgMode ? cardColor : 'transparent'};
  outline: ${({ cardColor, imgMode, found }) =>
    found || !imgMode ? 'none' : `solid 6px ${cardColor}`};

  outline-offset: -4px;
  opacity: ${({ found }) => (found ? 0.2 : 1)};
  margin: 5px;
  padding: 5px;
`;

const Card: React.FC<{
  cardColor: Color;
  width: number;
  imgMode: boolean;
  disabled: boolean;
}> = ({ cardColor, width, imgMode, disabled }) => {
  const [found, setFound] = useState(false);
  return (
    <CardDiv
      imgMode={imgMode}
      cardColor={cardColor}
      width={width}
      found={found}
      onClick={() => !disabled && setFound((v) => !v)}
    />
  );
};

const Container = styled.div<{ isHidden: boolean; imgMode: boolean }>`
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
  margin: 0 -6px;
`;

export const Tiles: React.FC<{
  game: Color[][];
  seed: string;
  width: number;
  hidden: boolean;
  imgMode?: boolean;
  disabled?: boolean;
}> = ({ game, seed, width, hidden, imgMode = false, disabled = false }) => (
  <Container isHidden={hidden} imgMode={imgMode}>
    {game.map((row, key1) => (
      // eslint-disable-next-line react/no-array-index-key
      <Row key={key1}>
        {row.map((color, key2) => (
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={seed + key2}
            cardColor={color}
            width={Math.floor(width / 5) - 6}
            imgMode={imgMode}
            disabled={disabled}
          />
        ))}
      </Row>
    ))}
  </Container>
);
