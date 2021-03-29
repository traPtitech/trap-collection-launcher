import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Background from '@/renderer/components/Background';
import * as config from '@/renderer/config';
import BackgroundProvider from '@/renderer/contexts/Background';
import GlobalStyle from '@/renderer/styles/GlobalStyle';

type Props = {
  config: config.Config;
};

const App: React.FC<Props> = ({ config }) => (
  <BackgroundProvider>
    <GlobalStyle />
    <MemoryRouter>
      <Switch>
        {config.routes.map(({ path, element }) => (
          <Route key={path} exact path={path}>
            {element}
          </Route>
        ))}
      </Switch>
    </MemoryRouter>
    <Background />
  </BackgroundProvider>
);

export default App;
