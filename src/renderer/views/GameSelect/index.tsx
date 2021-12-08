import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import styled from 'styled-components';
import SideBar from '@/renderer/components/SideBar';
import Slider from '@/renderer/components/Slider';

const Div = ({ ...props }) => <div {...props} />;
const Video = ({ ...props }) => <video {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const VideoWrapper = styled(Div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundVideo = styled(Video)<{ isVideoLoad: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isVideoLoad ? '100%' : '0%')};
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
`;

const MenuButton = styled(MdMenu)`
  height: 3.125rem;
  width: 3.125rem;
  color: ${(props) => props.theme.colors.text.header};
`;

const MenuBackground = styled(Div)<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background.menu};
  opacity: ${(props) => (props.isOpen ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.normal} ease-out;
  pointer-events: none;
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
};

const GameSelect = ({ gameInfos }: Props) => {
  const [selectedGame, setSelectedGame] = useState(0);
  const [isVideoLoad, setIsVideoLoad] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <Wrapper>
      <VideoWrapper>
        <BackgroundVideo
          src={gameInfos[mod(selectedGame, gameInfos.length)].video}
          poster={gameInfos[mod(selectedGame, gameInfos.length)].poster}
          isVideoLoad={isVideoLoad}
          autoPlay
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
      <MenuButtonWrapper>
        <MenuButton onClick={() => setIsOpenMenu(true)} />
      </MenuButtonWrapper>
      <MenuBackground isOpen={isOpenMenu} />
      <SideBar
        isOpen={isOpenMenu}
        items={[]}
        koudaisai={false}
        onCancel={() => setIsOpenMenu(false)}
      />
    </Wrapper>
  );
};

export default GameSelect;
