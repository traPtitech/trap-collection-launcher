import React from 'react';
import styled from 'styled-components';
import GameListItem from './GameListItem';

const GameListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 480px);
  justify-content: center;
`;

type Props = {
  games: {
    id: string;
    poster: string;
    video: string;
  }[];
};

const GameList: React.FC<Props> = ({ games }) => {
  return (
    <GameListContainer>
      {games.map((game) => (
        <GameListItem key={game.id} {...game} />
      ))}
    </GameListContainer>
  );
};

export default GameList;
