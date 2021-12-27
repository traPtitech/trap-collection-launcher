import React, { createContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NetworkErrorModal from './components/NetworkErrorModal';
import { createTheme } from './styles/theme';
import { isKoudaisai } from '@/config';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import GameSelect from '@/renderer/views/GameSelect';
import TitlePage from '@/renderer/views/Title';

export type Page = 'title' | 'gameSelect';

const ModalBackground = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background.menu};
  opacity: ${(props) => (props.$isOpen ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.normal} ease-out;
  pointer-events: none;
`;

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

export const NavigateContext = createContext<
  ((page: Page) => void) | undefined
>(undefined);

export const ShowNetworkErrorContext = createContext<(() => void) | undefined>(
  undefined
);

export const SetOfflineModeContext = createContext<
  [boolean, (isOfflineMode: boolean) => void] | undefined
>(undefined);

const App = () => {
  const [page, setPage] = useState<Page>('title');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isOpenNetworkErrorModal, setIsOpenNetworkErrorModal] = useState(false);

  const navigate = (page: Page) => {
    setPage(page);
  };

  const showNetworkError = () => {
    setIsOpenNetworkErrorModal(true);
  };

  const useIsOffline: [boolean, (isOfflineMode: boolean) => void] = [
    isOfflineMode,
    (isOfflineMode: boolean) => setIsOfflineMode(isOfflineMode),
  ];

  return (
    <ThemeProvider theme={createTheme({ dark: false })}>
      <GlobalStyle />
      <NavigateContext.Provider value={navigate}>
        <ShowNetworkErrorContext.Provider value={showNetworkError}>
          <SetOfflineModeContext.Provider value={useIsOffline}>
            <Navigation page={page} koudaisai={isKoudaisai} />
            <ModalBackground $isOpen={isOpenNetworkErrorModal} />
            <NetworkErrorModal
              closeHandler={() => setIsOpenNetworkErrorModal(false)}
              isOpen={isOpenNetworkErrorModal}
            />
          </SetOfflineModeContext.Provider>
        </ShowNetworkErrorContext.Provider>
      </NavigateContext.Provider>
    </ThemeProvider>
  );
};

export default App;
