import React, { createContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NetworkErrorModal from './components/NetworkErrorModal';
import { createTheme } from './styles/theme';
import ProductKeySelect from './views/ProductKeySelect';
import { isKoudaisai } from '@/config';
import GlobalStyle from '@/renderer/styles/GlobalStyle';
import GameSelect from '@/renderer/views/GameSelect';
import TitlePage from '@/renderer/views/Title';

export type Page = 'title' | 'gameSelect' | 'productKeySelect';

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
    case 'productKeySelect':
      return <ProductKeySelect></ProductKeySelect>;
  }
};

export const NavigateContext = createContext<
  ((page: Page) => void) | undefined
>(undefined);

export const ShowNetworkErrorContext = createContext<(() => void) | undefined>(
  undefined
);

export const SelectedProductKeyContext = createContext<
  [string | null, (productKey: string | null) => void]
>([
  null,
  () => {
    return;
  },
]);

export const SetOfflineModeContext = createContext<
  [boolean, (isOfflineMode: boolean) => void] | undefined
>(undefined);

const App = () => {
  const [page, setPage] = useState<Page>('productKeySelect');
  const [selectedProductKey, setSelectedProductKey] = useState<string | null>(
    null
  );
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
            <SelectedProductKeyContext.Provider
              value={[selectedProductKey, setSelectedProductKey]}
            >
              <Navigation page={page} koudaisai={isKoudaisai} />
              <ModalBackground $isOpen={isOpenNetworkErrorModal} />
              <NetworkErrorModal
                closeHandler={() => setIsOpenNetworkErrorModal(false)}
                isOpen={isOpenNetworkErrorModal}
              />
            </SelectedProductKeyContext.Provider>
          </SetOfflineModeContext.Provider>
        </ShowNetworkErrorContext.Provider>
      </NavigateContext.Provider>
    </ThemeProvider>
  );
};

export default App;
