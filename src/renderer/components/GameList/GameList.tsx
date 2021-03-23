import React from 'react';
import styled from 'styled-components';
import GameListItem from './GameListItem';

const GameListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 470px);
  grid-gap: 10px;
  justify-content: center;

  &:hover > * {
    transition: 125ms transform;
    transition-timing-function: ease-out;
  }

  &:hover > *:hover {
    border: 2px solid white;
    transform: scale(1.03);
  }

  &:hover > *:not(:hover) {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.8;
    }
  }
`;

type Props = {
  games: TraPCollection.GameInfo[];
  onGameHovered: (game: TraPCollection.GameInfo) => void;
  onGameUnhovered: () => void;
};

const GameList: React.FC<Props> = ({
  games,
  onGameUnhovered,
  onGameHovered,
}) => {
  return (
    <GameListContainer onMouseLeave={onGameUnhovered}>
      {games.map((game) => (
        <GameListItem key={game.id} onGameHovered={onGameHovered} game={game} />
      ))}
    </GameListContainer>
  );
};

export default GameList;
