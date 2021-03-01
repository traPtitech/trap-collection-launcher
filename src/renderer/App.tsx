import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Title from '@/renderer/views/Title';
import GameList from '@/renderer/views/GameList';
import GameDetail from '@/renderer/views/GameDetail';
import Setting from '@/renderer/views/Setting';

const App: React.FC = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path='/'>
        <Title />
      </Route>

      <Route exact path='/game'>
        <GameList />
      </Route>

      <Route path='/game/:id'>
        <GameDetail />
      </Route>

      <Route exact path='/setting'>
        <Setting />
      </Route>
    </Switch>
  </MemoryRouter>
);

export default App;
