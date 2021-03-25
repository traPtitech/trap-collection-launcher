import React from 'react';
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom';
import Background from '@/renderer/components/Background';
import BackgroundProvider from '@/renderer/contexts/Background';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import GameDetail from '@/renderer/views/GameDetail';
import GameList from '@/renderer/views/GameList';
import LoadingPage from '@/renderer/views/Loading';
import Questionnaire from '@/renderer/views/Questionnaire';
import SettingPage from '@/renderer/views/Setting';
import TitlePage from '@/renderer/views/Title';

const Navigation: React.FC = () => (
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
