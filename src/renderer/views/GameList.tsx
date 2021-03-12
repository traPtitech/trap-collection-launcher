import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GameList from '@/renderer/components/GameList/GameList';
import { useVideoAsBackground } from '@/renderer/hooks/useVideoAsBackground';

const PageContainer = styled.div`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 960px;
  padding: 20px 0;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1``;

const Content = styled.div`
  padding-top: 100px;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
`;

const FooterLinkContainer = styled.div`
  float: right;
  padding-right: 20px;
`;

const useGames = () => {
  const [games, setGames] = useState<TraPCollection.GameInfo[]>([]);
  useEffect(() => {
    setGames(GAMES);
  }, []);

  return games;
};

const useSelectedGame = (games: TraPCollection.GameInfo[]) => {
  const [game, setGame] = useState<TraPCollection.GameInfo | null>(null);

  const setGameById = useCallback(
    (id: string) => {
      setGame(games.find((game) => game.id === id) ?? null);
    },
    [games]
  );
  const unsetGame = useCallback(() => {
    setGame(null);
  }, []);

  return [game, setGameById, unsetGame] as const;
};

const GameListPage: React.FC = () => {
  const games = useGames();
  const [game, setGameById, unsetGame] = useSelectedGame(games);
  useVideoAsBackground(game?.video);

  return (
    <PageContainer>
      <Header>
        <Title>{game?.name ?? 'Game List'}</Title>
      </Header>
      <Content>
        <GameList
          games={games}
          onGameUnhovered={unsetGame}
          onGameHovered={setGameById}
        />
      </Content>
      <Footer>
        <FooterLinkContainer>
          <Link to='/questionnarie'>Finish</Link>
        </FooterLinkContainer>
      </Footer>
    </PageContainer>
  );
};

export default GameListPage;

const GAMES: TraPCollection.GameInfo[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  name: `Game title ${i}`,
  createdAt: '20210312',
  description: 'description',
  version: {
    id: 'foo',
    name: 'name',
    description: 'description',
    createdAt: '20210312',
  },
  poster: `https://via.placeholder.com/1500/${Array(3)
    .fill(Number(i).toString(16)[0])
    .join('')}/88c0d0`,
  video: [
    'file:///C:/Users/cager/Videos/Captures/Hammer.mp4',
    'file:///C:/Users/cager/Videos/PPPPV.mp4',
    'file:///C:/Users/cager/Videos/Captures/Mobx.mp4',
  ][i % 3],
}));
