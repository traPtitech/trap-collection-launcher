import React, { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme } from './styles/theme';
import * as config from '@/renderer/config';
import { ConfigProvider } from '@/renderer/contexts/Config';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import GameSelect from '@/renderer/views/GameSelect';
import TitlePage from '@/renderer/views/Title';

export type Page = 'title' | 'gameSelect';

const Navigation = ({
  page,
  koudaisai,
}: {
  page: Page;
  koudaisai: boolean;
}) => {
  switch (page) {
    case 'title':
      return <TitlePage></TitlePage>;
    case 'gameSelect':
      return <GameSelect koudaisai={koudaisai}></GameSelect>;
  }
};

type Props = {
  config: config.Config;
  koudaisai?: boolean;
};

export const NavigateContext = createContext<
  ((page: Page) => void) | undefined
>(undefined);

const App = ({ config, koudaisai }: Props) => {
  const [page, setPage] = useState<Page>('title');
  const navigate = (page: Page) => {
    setPage(page);
  };

  return (
    <ConfigProvider value={config}>
      <ThemeProvider theme={createTheme({ dark: false })}>
        <GlobalStyle />
        <NavigateContext.Provider value={navigate}>
          <Navigation page={page} koudaisai={koudaisai ?? false} />
        </NavigateContext.Provider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
