import Cleave from 'cleave.js/react';
import React, { useContext, useEffect, useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import styled, { useTheme } from 'styled-components';
import { NavigateContext } from '@/renderer/App';
import collectionLogo from '@/renderer/assets/logo.svg';

const Div = ({ ...props }) => <div {...props} />;
const Img = ({ ...props }) => <img {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.panel.primary};
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
  height: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
`;

const ProductKeyText = styled(Div)<{ $invalidProductKey: boolean }>`
  position: relative;
  color: ${(props) =>
    props.$invalidProductKey
      ? props.theme.colors.text.warn
      : props.theme.colors.text.primary};
  font-size: 1rem;
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

const TitlePage = () => {
  const [productKey, setProductKey] = useState<string>('');
  const navigate = useContext(NavigateContext);
  const [invalidProductKey, setInvalidProductKey] = useState(false);
  const [needUserInput, setNeedUserInput] = useState(false);
  const theme = useTheme();

  const tryLogin = async (key: string) => {
    setNeedUserInput(false);
    if (isValidProductKeyFormat(key) === false) {
      setNeedUserInput(true);
      return false;
    }
    //Todo: const success = await window.TraPCollectionAPI.invoke.postLauncherLogin(key);
    const success = false; //Todo: delete this line
    console.log(success);
    if (success) {
      //Todo: window.TraPCollectionAPI.invoke.syncGame();
      navigate && navigate('gameSelect');
      return true;
    } else {
      setNeedUserInput(true);
      return false;
    }
  };

  useEffect(() => {
    const fetchProductKeyAndLogin = async () => {
      const res = await window.TraPCollectionAPI.invoke.getProductKey();
      if (res === undefined) {
        setNeedUserInput(true);
      } else {
        tryLogin(res);
      }
    };
    fetchProductKeyAndLogin();
  }, []);

  const onEnterProductKey = () => {
    if (!isValidProductKeyFormat(productKey)) {
      return;
    }
    window.TraPCollectionAPI.invoke.setProductKey(productKey);
    const tryLoginAndCheck = async () => {
      const res = await tryLogin(productKey);
      if (res === false) {
        setInvalidProductKey(true);
      }
    };
    tryLoginAndCheck();
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
        {needUserInput ? (
          <>
            <ProductKeyText $invalidProductKey={invalidProductKey}>
              {invalidProductKey
                ? 'プロダクトキーが誤っています'
                : 'プロダクトキーを入力して下さい'}
            </ProductKeyText>
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
        ) : (
          <>
            <Loader
              type='Oval'
              height='60'
              width='60'
              color={theme.colors.button.information.fill}
            />
          </>
        )}
      </BottomWrapper>
    </Wrapper>
  );
};

export default TitlePage;
