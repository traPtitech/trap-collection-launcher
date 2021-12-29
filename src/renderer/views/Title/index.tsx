import Cleave from 'cleave.js/react';
import React, { useContext, useEffect, useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { BarLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
import {
  NavigateContext,
  SetOfflineModeContext,
  ShowNetworkErrorContext,
} from '@/renderer/App';
import collectionLogo from '@/renderer/assets/logo.svg';
import FetchLog from '@/renderer/components/FetchLog';

const Div = ({ ...props }) => <div {...props} />;
const Img = ({ ...props }) => <img {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.panel.primary};
  user-select: none;
`;

const TitleContainer = styled(Div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomWrapper = styled(Div)`
  position: absolute;
  height: 40%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
`;

const BottomText = styled(Div)<{ $invalidProductKey: boolean }>`
  position: relative;
  color: ${(props) =>
    props.$invalidProductKey
      ? props.theme.colors.text.warn
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSize.exSmall};
  transform: rotate(0.03deg);
  font-weight: bold;
`;

const ProductKeyInputWrapper = styled(Div)`
  position: relative;
  width: 23.5rem;
  height: 2.5rem;
`;

const ProductKeyInput = styled(Cleave)<{ $invalidProductKey: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-bottom: solid;
  border-width: 0.125rem;
  border-color: ${(props) =>
    props.$invalidProductKey
      ? props.theme.colors.text.warn
      : props.theme.colors.text.placeholder};
  &:focus {
    border-color: ${(props) =>
      props.$invalidProductKey
        ? props.theme.colors.text.warn
        : props.theme.colors.text.primary};
  }
  color: ${(props) => props.theme.colors.text.primary};
  background-color: transparent;
  text-align: center;
  transform: rotate(0.03deg);
`;

const EnterButton = styled(Div)<{ $isValidProductKey: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2.5rem;
  background-color: ${(props) => props.theme.colors.button.transparent.fill};
  &:hover {
    background-color: ${(props) =>
      props.$isValidProductKey && props.theme.colors.button.transparent.hover};
  }
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => props.$isValidProductKey && 'pointer'};
  color: ${(props) =>
    props.$isValidProductKey
      ? props.theme.colors.text.primary
      : props.theme.colors.text.placeholder};
  transition: background-color ${(props) => props.theme.duration.normal}
    ease-out;
`;

const EnterIcon = styled(MdArrowForward)`
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
`;

const CollectionLogoWrapper = styled(Img)`
  position: relative;
  width: 34.375rem;
  height: auto;
`;

const isValidProductKeyFormat = (str: string) => {
  return /^[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}-[0-9a-zA-Z]{5}$/.test(
    str
  );
};

type Progress = 'inputProductkey' | 'login' | 'fetchGame';

const TitlePage = () => {
  const [productKey, setProductKey] = useState<string>('');
  const navigate = useContext(NavigateContext);
  const showNetworkError = useContext(ShowNetworkErrorContext);
  const [invalidProductKey, setInvalidProductKey] = useState(false);
  const [progress, setProgress] = useState<Progress>('login');
  const theme = useTheme();
  const [isOfflineMode] = useContext(SetOfflineModeContext) ?? [];
  const [downloadFetchLog, setDownloadFetchLog] = useState<
    TraPCollection.Progress | undefined
  >(undefined);

  const tryLogin = async () =>
    (async () => {
      setProgress('login');
      const success = await window.TraPCollectionAPI.invoke.postLauncherLogin();
      if (success) {
        setProgress('fetchGame');
        await window.TraPCollectionAPI.invoke.fetchGame();
        navigate && navigate('gameSelect');
        return true;
      } else {
        setProgress('inputProductkey');
        return false;
      }
    })().catch(showNetworkError);

  const fetchGameProgress = async () => {
    const progress = await window.TraPCollectionAPI.invoke.progress();
    setDownloadFetchLog(progress);
  };

  useEffect(() => {
    (async () => {
      await tryLogin();
    })();
    const timerId = setInterval(fetchGameProgress, 500);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (isOfflineMode) {
      navigate && navigate('gameSelect');
    }
  }, [isOfflineMode, navigate]);

  const onEnterProductKey = () => {
    if (!isValidProductKeyFormat(productKey)) {
      return;
    }
    (async () => {
      await window.TraPCollectionAPI.invoke.setProductKey(productKey);
      const res = await tryLogin();
      if (!res) {
        setInvalidProductKey(true);
      }
    })();
  };

  const onKeyPressHandler = (e: { code: string }) => {
    if (e.code === 'Enter') {
      onEnterProductKey();
    }
  };

  return (
    <Wrapper>
      <TitleContainer>
        <CollectionLogoWrapper src={collectionLogo} />
      </TitleContainer>
      <BottomWrapper>
        {progress === 'inputProductkey' ? (
          <>
            <BottomText $invalidProductKey={invalidProductKey}>
              {invalidProductKey
                ? 'プロダクトキーが誤っています'
                : 'プロダクトキーを入力して下さい'}
            </BottomText>
            <ProductKeyInputWrapper>
              <ProductKeyInput
                onKeyPress={onKeyPressHandler}
                $invalidProductKey={invalidProductKey}
                placeholder='00000-00000-00000-00000-00000'
                options={{
                  delimiter: '-',
                  blocks: [5, 5, 5, 5, 5],
                }}
                onChange={(e) => {
                  setInvalidProductKey(false);
                  setProductKey(e.target.value);
                }}
              />
              <EnterButton
                $isValidProductKey={isValidProductKeyFormat(productKey)}
                onClick={onEnterProductKey}
              >
                <EnterIcon />
              </EnterButton>
            </ProductKeyInputWrapper>
          </>
        ) : progress === 'login' ? (
          <>
            <BottomText> ログインしています </BottomText>
            <BarLoader
              height='4px'
              width='200px'
              color={theme.colors.button.information.fill}
            />
          </>
        ) : progress === 'fetchGame' ? (
          <>
            <BottomText> ゲームをダウンロードしています </BottomText>
            {downloadFetchLog && <FetchLog log={downloadFetchLog} />}
          </>
        ) : undefined}
      </BottomWrapper>
    </Wrapper>
  );
};

export default TitlePage;
