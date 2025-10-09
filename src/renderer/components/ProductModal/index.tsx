import { useContext } from 'react';
import styled from 'styled-components';
import Modal, * as ModalPackage from '../Modal';
import { SelectedProductKeyContext } from '@/renderer/App';

const Content = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  user-select: text;
`;

const ProductModal = ({
  ...props
}: Omit<
  ModalPackage.Props,
  'noButton' | 'children' | 'modalType' | 'okButtonText' | 'title'
>) => {
  const [productKey] = useContext(SelectedProductKeyContext);

  return (
    <Modal title='プロダクトキー' noButton {...props}>
      <Content>{productKey}</Content>
    </Modal>
  );
};

export default ProductModal;
