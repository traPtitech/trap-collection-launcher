import React from 'react';
import SendSeatNum from './sendSeatNum';
import Modal, { ModalEventHandler } from '@/renderer/components/Modal';
import ProductModal from '@/renderer/components/ProductModal';

export type ModalType =
  | undefined
  | 'resetKey'
  | 'sendSeatNum'
  | 'productKey'
  | 'goWeb';

export type Props = {
  openedModal: ModalType;
  closeHandler: ModalEventHandler;
};

const Modals = ({ openedModal, closeHandler }: Props) => {
  return (
    <>
      <ProductModal
        isOpen={openedModal === 'resetKey'}
        onCancel={closeHandler}
      />
      <Modal
        modalType='warning'
        title='プロダクトキーをリセットします'
        isOpen={openedModal === 'resetKey'}
        okButtonText='リセット'
        onCancel={closeHandler}
        onOk={(e) => {
          closeHandler(e);
          //Todo: resetProductKey();
        }}
      >
        再び本ランチャーを使用するためには、再度プロダクトキーを入力する必要があります。この操作は取り消せません。
      </Modal>
      <Modal
        modalType='information'
        title='traPの公式ホームページに遷移します．'
        isOpen={openedModal === 'goWeb'}
        okButtonText='traP 公式ホームページ'
        onCancel={closeHandler}
        onOk={(e) => {
          closeHandler(e);
          window.TraPCollectionAPI.invoke.openHomePage();
        }}
      >
        traPの公式ホームページに遷移します．
      </Modal>
      <SendSeatNum
        isOpen={openedModal === 'sendSeatNum'}
        closeHandler={closeHandler}
      />
    </>
  );
};

export default Modals;
