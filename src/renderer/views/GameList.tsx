import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GameList from '@/renderer/components/GameList/GameList';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

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

const GameListPage: React.FC = () => {
  const games = useGames();
  const [game, setGame] = useState<TraPCollection.GameInfo | null>(null);
  useBackgroundVideo(game?.video);

  return (
    <PageContainer>
      <Header>
        <Title>{game?.name ?? 'Game List'}</Title>
      </Header>
      <Content>
        <GameList
          games={games}
          onGameUnhovered={() => setGame(null)}
          onGameHovered={setGame}
        />
      </Content>
      <Footer>
        <FooterLinkContainer>
          <Link to='/questionnaire'>Finish</Link>
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
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  version: {
    id: 'foo',
    name: 'name',
    description: 'description',
    createdAt: '20210312',
  },
  poster: [
    'https://static.vecteezy.com/system/resources/previews/000/108/317/non_2x/free-everest-pattern-3-vector.jpg',
    'https://images.freeimages.com/images/large-previews/5da/coloured-paper-1421280.jpg',
    'https://media.discordapp.net/attachments/792922594532655136/819864628489093140/mon.png?width=936&height=702',
  ][i % 3],
  video: [
    'file:///C:/Users/cager/Videos/Captures/Hammer.mp4',
    'file:///C:/Users/cager/Videos/Captures/flappybird.mp4',
    'file:///C:/Users/cager/Videos/Captures/Mobx.mp4',
  ][i % 3],
}));
