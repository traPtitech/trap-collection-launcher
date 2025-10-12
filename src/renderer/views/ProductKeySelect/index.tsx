import { useContext, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';
import AddProductKeyModal from './addProductKeyModal';
import { NavigateContext, SelectedProductKeyContext } from '@/renderer/App';

const Div = ({ ...props }) => <div {...props} />;
const Button = ({ ...props }) => <button {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.panel.primary};
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductKeysContainer = styled(Div)`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ProductKeyContainer = styled(Div)`
  position: relative;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0 1rem;
  cursor: pointer;
  transition: background-color 0.08s;
  background-color: 'transparent';
  &:hover {
    background-color: ${(props) => props.theme.colors.button.transparent.hover};
  }
  border-width: 0;
`;

const DescriptionContainer = styled(Div)`
  position: relative;
  height: 4rem;
  width: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.08s;
`;

const Description = styled(Div)`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.colors.text.primary};
  transform: rotate(0.03deg);
  font-weight: bold;
  padding-bottom: 1rem;
`;

const EditionName = styled(Div)`
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.colors.text.primary};
  transform: rotate(0.03deg);
`;

const Boarder = styled(Div)`
  height: 0.125rem;
  margin: 1rem 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.text.placeholder};
`;

const ProductKey = styled(Div)`
  margin: 1rem 0;
  font-size: ${(props) => props.theme.fontSize.exSmall};
  color: ${(props) => props.theme.colors.text.version};
  transform: rotate(0.03deg);
`;

const IconButton = styled(Button)`
  position: relative;
  height: 3rem;
  width: 3rem;
  color: ${(props) => props.theme.colors.text.version};
  transition: color 0.08s;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const AddIcon = styled(MdAdd)`
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
`;

const ProductKeySelect = () => {
  const [productKeys, setProductKeys] = useState<
    TraPCollection.LauncherVersion[]
  >([]);
  const navigate = useContext(NavigateContext);
  const [, setProductKey] = useContext(SelectedProductKeyContext);
  const [isAddProductKeyModalOpen, setIsAddProductKeyModalOpen] =
    useState(false);

  useEffect(() => {
    (async () => {
      const productKeys = await window.TraPCollectionAPI.invoke.getEditions();
      setProductKeys(productKeys);
      if (productKeys.length === 0) {
        navigate && navigate('title');
      }
    })();
  }, [navigate]);

  return (
    <Wrapper>
      <AddProductKeyModal
        openedModal={isAddProductKeyModalOpen}
        closeHandler={() => {
          setIsAddProductKeyModalOpen(false);
          (async () => {
            const productKeys =
              await window.TraPCollectionAPI.invoke.getEditions();
            setProductKeys(productKeys);
            if (productKeys.length === 0) {
              navigate && navigate('title');
            }
          })();
        }}
      />
      <ProductKeysContainer>
        <DescriptionContainer>
          <Description>エディションを選択してください</Description>
          <IconButton
            onClick={() => {
              setIsAddProductKeyModalOpen(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </DescriptionContainer>
        <Boarder />
        {productKeys.map((edition, i) => {
          return (
            <ProductKeyContainer
              key={i}
              onClick={() => {
                setProductKey(edition.productKey);
                navigate && navigate('title');
              }}
            >
              <EditionName>{edition.name}</EditionName>
              <ProductKey>{edition.productKey}</ProductKey>
            </ProductKeyContainer>
          );
        })}
      </ProductKeysContainer>
    </Wrapper>
  );
};

export default ProductKeySelect;
