import React from 'react';
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom';
import Background from '@/renderer/components/Background';
import * as config from '@/renderer/config';
import { BackgroundProvider } from '@/renderer/contexts/Background';
import { ConfigProvider, useConfig } from '@/renderer/contexts/Config';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import GameDetailPage from '@/renderer/views/GameDetail';
import GameListPage from '@/renderer/views/GameList';
import LoadingPage from '@/renderer/views/Loading';
import SettingPage from '@/renderer/views/Setting';
import TitlePage from '@/renderer/views/Title';

const Navigation: React.FC = () => {
  const { hasSettingPage } = useConfig();

  return (
    <MemoryRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/loading' />
        </Route>

        <Route exact path='/loading'>
          <LoadingPage />
        </Route>

        <Route exact path='/title'>
          <TitlePage />
        </Route>

        <Route exact path='/game'>
          <GameListPage />
        </Route>

        <Route exact path='/game/detail'>
          <GameDetailPage />
        </Route>

        {hasSettingPage && (
          <Route exact path='/setting'>
            <SettingPage />
          </Route>
        )}
      </Switch>
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
