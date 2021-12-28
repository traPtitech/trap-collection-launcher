import React, { forwardRef, useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { BarLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
import Description from './description';
import DotSelector from './dotSelector';
import Modals, { ModalType } from './modals';
import Mover from './mover';
import collectionLogo from '@/renderer/assets/logo.svg';
import SideBar from '@/renderer/components/SideBar';
import Slider from '@/renderer/components/Slider';

const Div = ({ ...props }) => <div {...props} />;
const Video = forwardRef<HTMLVideoElement, JSX.IntrinsicElements['video']>(
  ({ ...props }, ref) => <video {...props} ref={ref} />
);
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

// マウスの動きを監視するようのdiv
const WheelWatcher = styled(Div)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const ErrorMessage = styled(Div)`
  position: absolute;
  top: 4.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

// ゲームを切り替える最小の WheelEvent.deltaY の量
const threshold = 20;

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
  koudaisai: boolean;
};

const GameSelect = ({ koudaisai }: Props) => {
  const [selectedGame, setSelectedGame] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openedModal, setOpenedModal] = useState<ModalType>(undefined);
  const [canScroll, setCanScroll] = useState(true); //トラックパッドなどで非常に細かくwheelイベントが発生した際，処理落ちするのを防ぐ
  const [gameInfos, setGameInfos] = useState<
    TraPCollection.RendererGameInfo[] | undefined
  >(undefined);

  const theme = useTheme();

  const videoElement = React.useRef<HTMLVideoElement>(null);

  const onBrowserWindowFocus = () => {
    videoElement.current?.play();
  };
  const onBrowserWindowBlur = () => {
    videoElement.current?.pause();
  };
  useEffect(() => {
    (async () => {
      const res = await window.TraPCollectionAPI.invoke.getGameInfo();
      setGameInfos(res);

      window.TraPCollectionAPI.on.onBrowserWindowFocus(onBrowserWindowFocus);
      window.TraPCollectionAPI.on.onBrowserWindowBlur(onBrowserWindowBlur);
    })();

    return () => {
      window.TraPCollectionAPI.removeListener.onBrowserWindowFocus(
        onBrowserWindowFocus
      );
      window.TraPCollectionAPI.removeListener.onBrowserWindowBlur(
        onBrowserWindowBlur
      );
    };
  }, []);

  const menuItems = [
    {
      text: 'プロダクトキーの確認',
      onClick: () => {
        setIsOpenMenu(false);
        setOpenedModal('productKey');
      },
    },
    {
      text: 'プロダクトキーのリセット',
      onClick: () => {
        setIsOpenMenu(false);
        setOpenedModal('resetKey');
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
      {gameInfos !== undefined && gameInfos !== [] ? (
        <>
          <WheelWatcher
            onWheel={(e: { deltaY: number }) => {
              if (canScroll) {
                if (e.deltaY > threshold) {
                  setSelectedGame(selectedGame + 1);
                } else if (e.deltaY < -threshold) {
                  setSelectedGame(selectedGame - 1);
                }
                setCanScroll(false);
                setTimeout(() => setCanScroll(true), 100);
              }
            }}
          >
            <VideoWrapper>
              <BackgroundVideo
                ref={videoElement}
                src={
                  gameInfos[mod(selectedGame, gameInfos.length)]?.video ?? ''
                }
                poster={gameInfos[mod(selectedGame, gameInfos.length)].poster}
                autoPlay
                loop
                controls={false}
              />
            </VideoWrapper>
            <VideoOverlay />
            <SelectorBackGround />
            <Slider
              selected={selectedGame}
              gameInfos={gameInfos}
              onPlayGame={() => {
                (async () => {
                  const checkJava =
                    await window.TraPCollectionAPI.invoke.checkJava();
                  if (
                    gameInfos[mod(selectedGame, gameInfos.length)].type ==
                      'jar' &&
                    checkJava === false
                  ) {
                    setOpenedModal('noJava');
                  } else {
                    await window.TraPCollectionAPI.invoke.launch(
                      gameInfos[mod(selectedGame, gameInfos.length)].id
                    );
                  }
                })();
              }}
              onClickGame={(i) => {
                setSelectedGame(i);
              }}
            />
            <Description
              gameInfo={gameInfos[mod(selectedGame, gameInfos.length)]}
            />

            <Mover
              onClickLeft={() => setSelectedGame(selectedGame - 1)}
              onClickRight={() => setSelectedGame(selectedGame + 1)}
            />

            <DotSelector
              length={gameInfos.length}
              selectedGame={selectedGame}
              onClickGame={(i) => {
                setSelectedGame(i);
              }}
            />
          </WheelWatcher>
        </>
      ) : gameInfos === [] ? (
        <ErrorMessage>ゲームが取得できませんでした</ErrorMessage>
      ) : (
        <ErrorMessage>
          <BarLoader
            height='4px'
            width='200px'
            color={theme.colors.button.information.fill}
          />
        </ErrorMessage>
      )}
      <Border />
      <MenuButtonWrapper onClick={() => setIsOpenMenu(true)}>
        <MenuButton />
      </MenuButtonWrapper>
      <CollectionLogo src={collectionLogo} />

      <MenuBackground $isOpen={isOpenMenu || openedModal !== undefined} />
      <SideBar
        isOpen={isOpenMenu}
        items={menuItems}
        koudaisai={koudaisai}
        setOpenedModal={setOpenedModal}
        setIsOpenMenu={setIsOpenMenu}
        onCancel={() => setIsOpenMenu(false)}
      />

      <Modals
        openedModal={openedModal}
        closeHandler={() => setOpenedModal(undefined)}
      />
    </Wrapper>
  );
};

export default GameSelect;
