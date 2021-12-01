import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import Background from '@/renderer/components/Background';
import * as config from '@/renderer/config';
import { BackgroundProvider } from '@/renderer/contexts/Background';
import { ConfigProvider } from '@/renderer/contexts/Config';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import GameDetailPage from '@/renderer/views/GameDetail';
import GameListPage from '@/renderer/views/GameList';
import InitPage from '@/renderer/views/Init';
import LoadingPage from '@/renderer/views/Loading';
import SettingPage from '@/renderer/views/Setting';
import TitlePage from '@/renderer/views/Title';

const Navigation: React.FC = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/init' />} />
        <Route path='/init' element={<InitPage />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path='/title' element={<TitlePage />} />
        <Route path='/game' element={<GameListPage />} />
        <Route path='/game/detail' element={<GameDetailPage />} />
        <Route path='/setting' element={<SettingPage />} />
      </Routes>
    </MemoryRouter>
  );
};

type Props = {
  config: config.Config;
};

const App: React.FC<Props> = ({ config }) => (
  <ConfigProvider value={config}>
    <BackgroundProvider>
      <GlobalStyle />
      <Navigation />
      <Background />
    </BackgroundProvider>
  </ConfigProvider>
);

export default App;
