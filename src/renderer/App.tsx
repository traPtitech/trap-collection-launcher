import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import LoadingPage from '@/renderer/views/Loading';
import TitlePage from '@/renderer/views/Title';
import GameList from '@/renderer/views/GameList';
import GameDetail from '@/renderer/views/GameDetail';
import SettingPage from '@/renderer/views/Setting';
import Questionnaire from '@/renderer/views/Questionnaire';
import Background from '@/renderer/components/Background';
import BackgroundProvider from '@/renderer/contexts/Background';

const Navigation: React.FC = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path='/'>
        <LoadingPage />
      </Route>

      <Route exact path='/title'>
        <TitlePage />
      </Route>

      <Route exact path='/game'>
        <GameList />
      </Route>

      <Route exact path='/game/detail'>
        <GameDetail />
      </Route>

      <Route exact path='/setting'>
        <SettingPage />
      </Route>

      <Route exact path='/questionnaire'>
        <Questionnaire />
      </Route>
    </Switch>
  </MemoryRouter>
);

const App: React.FC = () => (
  <BackgroundProvider>
    <GlobalStyle />
    <Navigation />
    <Background />
  </BackgroundProvider>
);

export default App;
