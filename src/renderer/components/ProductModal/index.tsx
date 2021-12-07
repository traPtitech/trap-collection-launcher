import React, { useEffect, useState } from 'react';
import Modal, * as ModalPackage from '../Modal';

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
      {productKey}
    </Modal>
  );
};

export default ProductModal;
