import React, { useContext, useState } from 'react';
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

const ProductKeyInput = styled(Input)`
  width: 23.5rem;
  height: 1.75rem;
  outline: none;
  border: none;
  border-bottom: solid;
  border-width: 0.125rem;
  border-color: ${(props) => props.theme.colors.text.placeholder};
  &:focus {
    border-color: ${(props) => props.theme.colors.text.primary};
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

const makeProductKey: (str: string) => string = (str) => {
  const loop = (str: string) => {
    if (str.length > 5) {
      return str.slice(0, 5) + '-' + makeProductKey(str.slice(5));
    }
    return str;
  };
  return loop(str.replace(/[^0-9]/gi, '').slice(0, 25));
};

const isValidProductKeyFormat = (str: string) => {
  return str.split('-').every((s) => s.length === 5) && str.length === 29;
};

const TitlePage = () => {
  const [productKey, setProductKey] = useState<string>('');
  const navigate = useContext(NavigateContext);

  const onKeyPressHandler = (e: { keyCode: number }) => {
    if (e.keyCode === 13 && isValidProductKeyFormat(productKey)) {
      // window.TraPCollectionAPI.invoke.postLauncherLogin('productKey');
      navigate && navigate('gameSelect');
    }
  };

  return (
    <Wrapper onKeyPress={onKeyPressHandler}>
      <TitleContainer>
        <CollectionLogoWrapper src={collectionLogo} />
      </TitleContainer>
      <ProductKeyInputWrapper>
        <ProductKeyText>プロダクトキーを入力して下さい</ProductKeyText>
        <ProductKeyInput
          value={productKey}
          onChange={(e: { target: { value: string } }) =>
            setProductKey(makeProductKey(e.target.value))
          }
        />
      </ProductKeyInputWrapper>
    </Wrapper>
  );
};

export default TitlePage;
