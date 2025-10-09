import { useContext } from 'react';
import styled from 'styled-components';
import Modal, * as ModalPackage from '../Modal';
import { SetOfflineModeContext } from '@/renderer/App';

const Content = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  user-select: text;
`;

const NetworkErrorModal = ({
  closeHandler,
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
> & { closeHandler: () => void }) => {
  const [, setOfflineMode] = useContext(SetOfflineModeContext) ?? [];

  return (
    <Modal
      title='サーバーの接続に失敗しました'
      {...props}
      onOk={() => {
        setOfflineMode && setOfflineMode(true);
        closeHandler();
      }}
      onCancel={() => window.TraPCollectionAPI.invoke.reloadWindow()}
      okButtonText='オフラインモードで起動'
      modalType='warning'
    >
      <Content>
        オフラインモードで起動しますか？ <br />
        ゲーム，ランチャーの自動更新は利用出来ません．
      </Content>
    </Modal>
  );
};

export default NetworkErrorModal;
