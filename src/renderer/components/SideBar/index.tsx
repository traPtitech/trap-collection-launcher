import React, { MouseEvent, MouseEventHandler, useEffect } from 'react';
import { MdClose, MdNavigateNext } from 'react-icons/md';
import styled from 'styled-components';
import { packageJson } from '@/config';
import trap from '@/renderer/assets/trap.svg';
import { ModalType } from '@/renderer/views/GameSelect/modals';

const Div = ({ ...props }) => <div {...props} />;

const Overlay = styled(Div)<{ $isOepn: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0;
  z-index: 2;
  transition: opacity ${(props) => props.theme.duration.normal} ease-out,
    visibility ${(props) => props.theme.duration.normal};

  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
`;

const Display = styled(Div)<{ $isOpen: boolean }>`
  position: absolute;
  background-color: ${(props) => props.theme.colors.panel.primary};
  padding: 0rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 22.5rem;
  transition: transform ${(props) => props.theme.duration.normal} ease-out;
  z-index: 3;

  transform: translateX(${(props) => (props.$isOpen ? '0rem' : '-0.6rem')});
`;

const Title = styled(Div)`
  font-size: 1.75rem;
  height: 4.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text.header};
`;

const Contents = styled(Div)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const Item = styled(Div)`
  box-sizing: border-box;
  height: auto;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.button.transparent.fill};
  &:hover {
    background-color: ${(props) => props.theme.colors.button.transparent.hover};
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color ${(props) => props.theme.duration.normal}
    ease-out;
`;

const ItemText = styled(Div)`
  padding: 1.25rem;
  font-size: 1rem;
  height: auto;
  color: ${(props) => props.theme.colors.text.primary};
`;

const Foot = styled(Div)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const FootLogo = styled(Div)`
  cursor: pointer;
`;

const Collection = styled(Div)`
  position: relative;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.version};
`;

const Version = styled(Div)`
  position: relative;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.version};
`;

const MetaData = styled(Div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 11rem;
`;

const Edition = styled(Div)`
  position: relative;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.version};
`;

const OnlyTrap = styled(Div)`
  position: relative;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.warn};
`;

const CloseButtonWrapper = styled(Div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 4.5rem;
  width: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.button.transparent.hover};
  }
`;

const CloseButton = styled(MdClose)`
  position: relative;
  height: 3rem;
  width: 3rem;
  color: ${(props) => props.theme.colors.text.header};
`;

const NavigateButton = styled(MdNavigateNext)`
  position: relative;
  height: 2.5rem;
  width: auto;
  margin-right: 0.6rem;
`;

export type Props = {
  items: { text: string; onClick: MouseEventHandler<HTMLDivElement> }[];
  setOpenedModal: React.Dispatch<React.SetStateAction<ModalType>>;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  koudaisai: boolean;
};

const SideBar = ({
  isOpen,
  setOpenedModal,
  setIsOpenMenu,
  items,
  onCancel,
  koudaisai,
}: Props) => {
  useEffect(() => {
    const active = document.activeElement as HTMLElement;
    active && isOpen && active.blur();
  }, [isOpen]);

  const itemsHTML = items.map(({ text, onClick }, index) => (
    <Item onClick={onClick} key={index}>
      <ItemText>{text}</ItemText>
      <NavigateButton />
    </Item>
  ));

  return (
    <Overlay onClick={onCancel} $isOpen={isOpen}>
      <Display
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
        $isOpen={isOpen}
      >
        <CloseButtonWrapper onClick={onCancel}>
          <CloseButton />
        </CloseButtonWrapper>
        <Title>設定一覧</Title>
        <Contents>{itemsHTML}</Contents>
        <Foot>
          {koudaisai ? (
            <OnlyTrap>このメニューは部員専用です</OnlyTrap>
          ) : undefined}
          <FootLogo title='公式ホームページ'>
            <img
              src={trap}
              width='224'
              onClick={() => {
                setIsOpenMenu(false);
                setOpenedModal('goWeb');
              }}
            />
          </FootLogo>
          <MetaData>
            <Collection>traP Collection</Collection>
            <Version>{`ver. ${packageJson.version}`}</Version>
          </MetaData>
          {koudaisai ? <Edition> {'Kodaisai Edition'} </Edition> : undefined}
        </Foot>
      </Display>
    </Overlay>
  );
};

export default SideBar;
