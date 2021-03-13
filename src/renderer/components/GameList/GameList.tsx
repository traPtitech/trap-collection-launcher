import React from 'react';
import styled from 'styled-components';
import GameListItem from './GameListItem';

const GameListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 470px);
  grid-gap: 5px;
  justify-content: center;
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
