import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import styled from 'styled-components';
import Mover from './mover';
import SendSeatNum from './sendSeatNum';
import collectionLogo from '@/renderer/assets/logo.svg';
import Modal from '@/renderer/components/Modal';
import SideBar from '@/renderer/components/SideBar';
import Slider from '@/renderer/components/Slider';

const Div = ({ ...props }) => <div {...props} />;
const Video = ({ ...props }) => <video {...props} />;
const Hr = ({ ...props }) => <hr {...props} />;
const Img = ({ ...props }) => <img {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
`;

const VideoWrapper = styled(Div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundVideo = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: opacity ${(props) => props.theme.duration.normal} ease-out;
`;

const VideoOverlay = styled(Div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 19.125rem;
  left: 0;
  background-color: ${(props) => props.theme.colors.overlay.video};
`;

const SelectorBackGround = styled(Div)`
  position: absolute;
  height: 19.125rem;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${(props) => props.theme.colors.background.selector};
`;

const MenuButtonWrapper = styled(Div)`
  position: absolute;
  height: 4.5rem;
  width: 4.5rem;
  top: 0rem;
  left: 0rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.button.transparent.hover};
  }
  transition: background-color ${(props) => props.theme.duration.normal}
    ease-out;
`;

const MenuButton = styled(MdMenu)`
  height: 3.125rem;
  width: 3.125rem;
  color: ${(props) => props.theme.colors.text.header};
`;

const MenuBackground = styled(Div)<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background.menu};
  opacity: ${(props) => (props.$isOpen ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.normal} ease-out;
  pointer-events: none;
`;

const Border = styled(Hr)`
  position: absolute;
  top: 4.5rem;
  left: 0;
  width: 100%;
  color: ${(props) => props.theme.colors.text.header};
  margin: 0;
`;

const CollectionLogo = styled(Img)`
  position: absolute;
  right: 1.5rem;
  top: 0.85rem;
  width: 10rem;
  height: auto;
`;

/**
 * Returns the remainder of a divided by b.
 * @param a {number} Dividend
 * @param b {number} Divisor
 * @returns {number} The remainder of a divided by b
 */
const mod = (a: number, b: number) => {
  const m = a % b;
  return m + (a < 0 && m !== 0 ? b : 0);
};

export type Props = {
  gameInfos: TraPCollection.GameInfo[];
  koudaisai: boolean;
};

type Modals = undefined | 'resetKey' | 'resetData' | 'sendSeatNum' | 'goWeb';

const GameSelect = ({ gameInfos, koudaisai }: Props) => {
  const [selectedGame, setSelectedGame] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openedModal, setOpenedModal] = useState<Modals>(undefined);

  const menuItems = [
    {
      text: 'プロダクトキーのリセット',
      onClick: () => {
        setIsOpenMenu(false);
        setOpenedModal('resetKey');
      },
    },
    {
      text: 'ゲーム本体データのリセット',
      onClick: () => {
        setIsOpenMenu(false);
        setOpenedModal('resetData');
      },
    },
    ...(koudaisai
      ? [
          {
            text: '座席番号の送信',
            onClick: () => {
              setIsOpenMenu(false);
              setOpenedModal('sendSeatNum');
            },
          },
        ]
      : []),
    {
      text: 'traP公式ホームページへ',
      onClick: () => {
        setIsOpenMenu(false);
        setOpenedModal('goWeb');
      },
    },
  ];

  return (
    <Wrapper>
      <VideoWrapper>
        <BackgroundVideo
          src={gameInfos[mod(selectedGame, gameInfos.length)].video}
          poster={gameInfos[mod(selectedGame, gameInfos.length)].poster}
          autoPlay
          controls={false}
        />
      </VideoWrapper>
      <VideoOverlay />
      <SelectorBackGround />
      <Slider
        selected={selectedGame}
        gameInfos={gameInfos}
        onClickGame={(i) => {
          setSelectedGame(i);
        }}
      />
      <Border />
      <MenuButtonWrapper onClick={() => setIsOpenMenu(true)}>
        <MenuButton />
      </MenuButtonWrapper>
      <CollectionLogo src={collectionLogo} />

      <Mover
        onClickLeft={() => setSelectedGame(selectedGame - 1)}
        onClickRight={() => setSelectedGame(selectedGame + 1)}
      />

      <MenuBackground $isOpen={isOpenMenu || openedModal !== undefined} />
      <SideBar
        isOpen={isOpenMenu}
        items={menuItems}
        koudaisai={koudaisai}
        onCancel={() => setIsOpenMenu(false)}
      />
      <Modal
        modalType='warning'
        title='プロダクトキーをリセットします'
        isOpen={openedModal === 'resetKey'}
        okButtonText='リセット'
        onCancel={() => setOpenedModal(undefined)}
      >
        再び本ランチャーを使用するためには、再度プロダクトキーを入力する必要があります。この操作は取り消せません。
      </Modal>
      <Modal
        modalType='warning'
        title='ゲーム本体のデータをリセットします'
        isOpen={openedModal === 'resetData'}
        okButtonText='リセット'
        onCancel={() => setOpenedModal(undefined)}
      >
        ダウンロードしたゲーム本体のデータをリセットします。プレイデータも一緒にリセットされます。
        この操作は取り消せません。
      </Modal>
      <Modal
        modalType='information'
        title='traPの公式ホームページに遷移します．'
        isOpen={openedModal === 'goWeb'}
        okButtonText='traP 公式ホームページ'
        onCancel={() => setOpenedModal(undefined)}
      >
        traPの公式ホームページに遷移します．
      </Modal>
      <SendSeatNum
        isOpen={openedModal === 'sendSeatNum'}
        onCancel={() => setOpenedModal(undefined)}
      />
    </Wrapper>
  );
};

export default GameSelect;
