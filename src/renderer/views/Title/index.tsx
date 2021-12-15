import Cleave from 'cleave.js/react';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavigateContext } from '@/renderer/App';
import collectionLogo from '@/renderer/assets/logo.svg';

const Div = ({ ...props }) => <div {...props} />;
const Img = ({ ...props }) => <img {...props} />;
const Input = ({ ...props }) => <input {...props} />;

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

const ProductKeyInputWrapper = styled(Div)`
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

const ProductKeyText = styled(Div)`
  position: relative;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  font-weight: bold;
`;

const ProductKeyInput = styled(Cleave)<{ $invalidProductKey: boolean }>`
  width: 23.5rem;
  height: 1.75rem;
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

const CollectionLogoWrapper = styled(Img)`
  position: relative;
  width: 34.375rem;
  height: auto;
`;

const isValidProductKeyFormat = (str: string) => {
  return str.split('-').every((s) => s.length === 5) && str.length === 29;
};

const TitlePage = () => {
  const [productKey, setProductKey] = useState<string>('');
  const navigate = useContext(NavigateContext);
  const [invalidProductKey, setInvalidProductKey] = useState(false);
  const [needUserInput, setNeedUserInput] = useState(false);

  const tryLogin = async (key: string) => {
    if (isValidProductKeyFormat(key) === false) {
      setInvalidProductKey(true);
      return false;
    }
    //Todo: const success = await window.TraPCollectionAPI.invoke.postLauncherLogin(key);
    const success = false; //Todo: delete
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
      {needUserInput && (
        <ProductKeyInputWrapper>
          <ProductKeyText>プロダクトキーを入力して下さい</ProductKeyText>
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
        </ProductKeyInputWrapper>
      )}
    </Wrapper>
  );
};

export default TitlePage;
