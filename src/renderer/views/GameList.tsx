import React from 'react';
import styled from 'styled-components';
import GameList from '@/renderer/components/GameList/GameList';

const GameListPageContainer = styled.div`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const GameListPageTitle = styled.h1``;

const games = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  poster: `https://via.placeholder.com/1500/${Array(3)
    .fill(Number(i).toString(16)[0])
    .join('')}/0ff`,
  video:
    'https://static.videezy.com/system/resources/previews/000/036/644/original/Fancy-1.mp4',
}));

const GameListPage: React.FC = () => {
  return (
    <GameListPageContainer>
      <GameListPageTitle>Game List</GameListPageTitle>
      <div>
        <GameList games={games} />
      </div>
    </GameListPageContainer>
  );
};

export default GameListPage;
