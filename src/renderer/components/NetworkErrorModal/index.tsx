import React from 'react';
import styled from 'styled-components';
import Modal, * as ModalPackage from '../Modal';

const Content = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  user-select: text;
`;

const NetworkErrorModal = ({
  ...props
}: Omit<
  ModalPackage.Props,
  | 'noButton'
  | 'children'
  | 'modalType'
  | 'onOk'
  | 'okButtonText'
  | 'title'
  | 'onCancel'
>) => {
  return (
    <Modal
      title='サーバーの接続に失敗しました'
      {...props}
      onOk={() => window.TraPCollectionAPI.invoke.quitApp()}
      onCancel={() => window.TraPCollectionAPI.invoke.reloadWindow()}
      modalType='warning'
    >
      <Content>ランチャーを終了しますか？</Content>
    </Modal>
  );
};

export default NetworkErrorModal;
