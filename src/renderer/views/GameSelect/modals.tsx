import React from 'react';
import SendSeatNum from './sendSeatNum';
import Modal, { ModalEventHandler } from '@/renderer/components/Modal';

export type ModalType =
  | undefined
  | 'resetKey'
  | 'resetData'
  | 'sendSeatNum'
  | 'goWeb';

export type Props = {
  openedModal: ModalType;
  onCancel: ModalEventHandler;
};

const Modals = ({ openedModal, onCancel }: Props) => {
  return (
    <>
      <Modal
        modalType='warning'
        title='プロダクトキーをリセットします'
        isOpen={openedModal === 'resetKey'}
        okButtonText='リセット'
        onCancel={onCancel}
      >
        再び本ランチャーを使用するためには、再度プロダクトキーを入力する必要があります。この操作は取り消せません。
      </Modal>
      <Modal
        modalType='warning'
        title='ゲーム本体のデータをリセットします'
        isOpen={openedModal === 'resetData'}
        okButtonText='リセット'
        onCancel={onCancel}
      >
        ダウンロードしたゲーム本体のデータをリセットします。プレイデータも一緒にリセットされます。
        この操作は取り消せません。
      </Modal>
      <Modal
        modalType='information'
        title='traPの公式ホームページに遷移します．'
        isOpen={openedModal === 'goWeb'}
        okButtonText='traP 公式ホームページ'
        onCancel={onCancel}
      >
        traPの公式ホームページに遷移します．
      </Modal>
      <SendSeatNum isOpen={openedModal === 'sendSeatNum'} onCancel={onCancel} />
    </>
  );
};

export default Modals;
