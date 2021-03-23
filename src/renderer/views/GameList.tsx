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

const Content = styled.div`
  padding-top: 60px;
  margin-bottom: 20px;
`;

const Footer = styled.footer``;

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
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。',
  ][i % 2],
  version: {
    id: 'foo',
    name: 'name',
    description: 'description',
    createdAt: '20210312',
  },
  type: 'app',
  url: 'unknown',
  poster: [
    'https://static.vecteezy.com/system/resources/previews/000/108/317/non_2x/free-everest-pattern-3-vector.jpg',
    'https://images.freeimages.com/images/large-previews/5da/coloured-paper-1421280.jpg',
    'https://media.discordapp.net/attachments/792922594532655136/819864628489093140/mon.png?width=936&height=702',
  ][i % 3],
  video: [
    'https://static.videezy.com/system/resources/previews/000/036/605/original/18_010_05.mp4',
    'https://static.videezy.com/system/resources/previews/000/036/541/original/w5.mp4',
    'https://static.videezy.com/system/resources/previews/000/018/793/original/Bacteria-blue.mp4',
  ][i % 3],
}));
