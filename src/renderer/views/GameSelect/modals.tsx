import React from 'react';
import styled from 'styled-components';
import SendSeatNum from './sendSeatNum';
import Modal, { ModalEventHandler } from '@/renderer/components/Modal';
import ProductModal from '@/renderer/components/ProductModal';

const JavaLink = styled.a`
  color: ${(props) => props.theme.colors.button.information.fill};
  text-decoration: none;
`;

export type ModalType =
  | undefined
  | 'resetKey'
  | 'sendSeatNum'
  | 'productKey'
  | 'goWeb'
  | 'noJava';

export type Props = {
  openedModal: ModalType;
  closeHandler: ModalEventHandler;
};

const Modals = ({ openedModal, closeHandler }: Props) => {
  return (
    <>
      <ProductModal
        isOpen={openedModal === 'productKey'}
        onCancel={closeHandler}
        onOk={closeHandler}
      />
      <Modal
        modalType='information'
        title='Javaがインストールされていません'
        isOpen={openedModal === 'noJava'}
        okButtonText='ダウンロードページへ'
        onOk={(e) => {
          closeHandler(e);
          window.TraPCollectionAPI.invoke.openJavaDownloadPage();
        }}
        onCancel={closeHandler}
      >
        このゲームをプレイするにはJavaのダウンロードが必要です。
      </Modal>
      <Modal
        modalType='warning'
        title='プロダクトキーをリセットします'
        isOpen={openedModal === 'resetKey'}
        okButtonText='リセット'
        onCancel={closeHandler}
        onOk={(e) => {
          closeHandler(e);
          window.TraPCollectionAPI.invoke.resetProductKey();
          window.TraPCollectionAPI.invoke.reloadWindow();
        }}
      >
        再び本ランチャーを使用するためには、再度プロダクトキーを入力する必要があります。この操作は取り消せません。
      </Modal>
      <Modal
        modalType='information'
        title='traP 公式ホームページ'
        isOpen={openedModal === 'goWeb'}
        okButtonText='開く'
        onCancel={closeHandler}
        onOk={(e) => {
          closeHandler(e);
          window.TraPCollectionAPI.invoke.openHomePage();
        }}
      >
        traPの公式ホームページを開きますか？
      </Modal>
      <SendSeatNum
        isOpen={openedModal === 'sendSeatNum'}
        closeHandler={closeHandler}
      />
    </>
  );
};

export default Modals;
