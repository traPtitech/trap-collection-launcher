import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal, * as ModalPackage from '../Modal';

const Content = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  user-select: text;
`;

const ProductModal = ({
  ...props
}: Omit<
  ModalPackage.Props,
  'noButton' | 'children' | 'modalType' | 'onOk' | 'okButtonText' | 'title'
>) => {
  const [productKey, setProductKey] = useState('');

  useEffect(() => {
    (async () => {
      const key = await window.TraPCollectionAPI.invoke.getProductKey();
      setProductKey(key ?? 'プロダクトキーが得られませんでした');
    })();
  }, []);

  return (
    <Modal title='プロダクトキー' noButton {...props}>
      <Content>{productKey}</Content>
    </Modal>
  );
};

export default ProductModal;
