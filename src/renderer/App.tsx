import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Background from '@/renderer/components/Background';
import * as config from '@/renderer/config';
import { BackgroundProvider } from '@/renderer/contexts/Background';
import { ConfigProvider, useConfig } from '@/renderer/contexts/Config';
import GlobalStyle from '@/renderer/styles/GlobalStyle';

const Navigation: React.FC = () => {
  const { routes } = useConfig();

  return (
    <MemoryRouter>
      <Switch>
        {routes.map(({ path, element }) => (
          <Route key={path} exact path={path}>
            {element}
          </Route>
        ))}
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
