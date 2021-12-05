import React, { MouseEvent, MouseEventHandler, useEffect } from 'react';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props}></div>;

type OverlayProps = {
  isOpen?: boolean;
};

const Overlay = styled(Div)<OverlayProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0;
  z-index: 2;
  transition: opacity 0.06s ease-out, visibility 0.06s;

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
`;

const Display = styled(Div)<OverlayProps>`
  position: absolute;
  background-color: #f3f3f3;
  padding: 0rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 22.5rem;
  transition: transform 0.06s ease-out;
  z-index: 3;

  transform: translateX(${(props) => (props.isOpen ? '0rem' : '-0.6rem')});
`;

const Title = styled(Div)`
  font-size: 1.75rem;
  height: 4.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #212121;
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
  padding: 1.25rem;
  font-size: 1rem;
  color: #212121;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
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

export type Props = {
  items: { text: string; onClick: MouseEventHandler<HTMLDivElement> }[];
  onCancel: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  onlyTrap: boolean;
};

const SideBar = ({ isOpen, items, onCancel, onlyTrap }: Props) => {
  useEffect(() => {
    const active = document.activeElement as HTMLElement;
    active && isOpen && active.blur();
  }, [isOpen]);

  const itemsHTML = items.map(({ text, onClick }, index) => (
    <Item onClick={onClick} key={index}>
      {text}
    </Item>
  ));

  return (
    <Overlay onClick={onCancel} isOpen={isOpen}>
      <Display
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
        isOpen={isOpen}
      >
        <Title>設定一覧</Title>
        <Contents>{itemsHTML}</Contents>
        <Foot>
          <div>test1</div>
          <div>test2</div>
        </Foot>
      </Display>
    </Overlay>
  );
};

export default SideBar;
