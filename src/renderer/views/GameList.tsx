import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GameList from '@/renderer/components/GameList/GameList';
import { BackgroundSetterContext } from '@/renderer/contexts/Background';

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

type Game = {
  id: string;
  name: string;
  poster: string;
  video: string;
};

const games = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  name: `Game title ${i}`,
  poster: `https://via.placeholder.com/1500/${Array(3)
    .fill(Number(i).toString(16)[0])
    .join('')}/88c0d0`,
  video: [
    'https://static.videezy.com/system/resources/previews/000/036/644/original/Fancy-1.mp4',
    'https://static.videezy.com/system/resources/previews/000/012/979/original/record_player_011.mp4',
    'https://static.videezy.com/system/resources/previews/000/041/209/original/clean04.mp4',
  ][i % 3],
}));

const useSelectedGame = (games: Game[]) => {
  const [game, setGame] = useState<Game | null>(null);

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
  const [game, setGameById, unsetGame] = useSelectedGame(games);
  const setter = useContext(BackgroundSetterContext);

  useEffect(() => {
    if (game?.video) {
      setter?.setBackground(game.video);
    } else {
      setter?.setDefaultBackground();
    }
  }, [game?.video, setter]);

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
