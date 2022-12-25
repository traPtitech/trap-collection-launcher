import Cleave from 'cleave.js/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalEventHandler } from '@/renderer/components/Modal';
import ProductModal from '@/renderer/components/ProductModal';

const Div = ({ ...props }) => <div {...props} />;

export type Props = {
  openedModal: boolean;
  closeHandler: ModalEventHandler;
};

const ProductKeyInputWrapper = styled(Div)`
  position: relative;
  width: 100%;
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

const AddProductKeyModal = ({ openedModal, closeHandler }: Props) => {
  const [value, setValue] = React.useState('');
  const [invalidProductKey, setInvalidProductKey] = useState(false);
  return (
    <Modal
      modalType='information'
      title='プロダクトキーを追加します'
      isOpen={openedModal}
      okButtonText='追加'
      onCancel={closeHandler}
      onOk={(e) => {
        (async () => {
          const isSuccess = await window.TraPCollectionAPI.invoke.addProductKey(
            value
          );
          if (isSuccess) {
            closeHandler(e);
          }
          setInvalidProductKey(true);
        })();
      }}
    >
      <ProductKeyInputWrapper>
        <ProductKeyInput
          $invalidProductKey={invalidProductKey}
          placeholder='00000-00000-00000-00000-00000'
          options={{
            delimiter: '-',
            blocks: [5, 5, 5, 5, 5],
          }}
          onChange={(e) => {
            setInvalidProductKey(false);
            setValue(e.target.value);
          }}
        />
      </ProductKeyInputWrapper>
    </Modal>
  );
};

export default AddProductKeyModal;
