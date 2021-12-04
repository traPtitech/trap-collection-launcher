import React, { useEffect } from 'react';
import styled from 'styled-components';

type OverlayProps = {
  isOpen?: boolean;
};

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 2;
  transition: opacity 0.06s ease-out, visibility 0.06s;

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
`;

Overlay.defaultProps = {
  isOpen: false,
};

const Display = styled.div<OverlayProps>`
  position: relative;
  background-color: #f3f3f3;
  padding: 1.69rem; //27px
  width: 37.5rem; //600px
  height: auto;
  border-radius: 0.5rem; //8px
  transition: transform 0.06s ease-out;
  z-index: 3;

  transform: scale(${(props) => (props.isOpen ? '1.0' : '0.98')});
`;

const Contents = styled.div`
  position: relative;
  padding: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem; //16px
`;

type ButtonProps = {
  buttonType: 'information' | 'warning' | 'cancel';
};

const buttonCustomProps = (props: ButtonProps) => {
  switch (props.buttonType) {
    case 'information':
      return `
border-width: 0;
background-color: #005bac;
color: #ffffff;
&:hover, &:focus {
  background-color: #004D93;
}
`;
    case 'warning':
      return `
border-width: 0;
background-color: #f26451;
color: #ffffff;
&:hover, &:focus {
  background-color:#CE5545;
}
`;
    case 'cancel':
      return `
border-width: 0.125rem;
background-color: #ffffff;
color: #444444;
&:hover, &:focus {
  background-color: #dadada;
}
`;
  }
};

const Button = styled.button<ButtonProps>`
  width: 13.5rem; //216px
  height: 3.38rem; //54px
  font-size: 0.938rem; //15px
  text-align: center;
  border-radius: 0.5rem; //8px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid;
  border-color: #444444;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  transition: background-color 0.06s ease-out;
  ${buttonCustomProps}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
`;

export type ModalElement = HTMLButtonElement | HTMLDivElement;
export type ModalEventHandler = (
  event: React.MouseEvent<ModalElement, MouseEvent>
) => void;

export type Props = {
  children: React.ReactNode;
  modalType?: 'information' | 'warning';
  onCancel?: ModalEventHandler | undefined;
  onOk?: ModalEventHandler | undefined;
  okButtonText?: string;
  title?: string;
  isOpen?: boolean;
};

const Modal = ({
  children,
  onCancel,
  onOk,
  okButtonText,
  title,
  isOpen,
  modalType,
}: Props) => {
  useEffect(() => {
    const active = document.activeElement as HTMLElement;
    active && isOpen && active.blur();
  }, [isOpen]);

  return (
    <div onClick={onCancel}>
      <Overlay isOpen={isOpen}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Display isOpen={isOpen}>
            <Contents>
              <Title>{title}</Title>
              <div>{children}</div>
              <Buttons>
                <Button buttonType='cancel' onClick={onCancel}>
                  キャンセル
                </Button>
                <Button buttonType={modalType ?? 'information'} onClick={onOk}>
                  {okButtonText}
                </Button>
              </Buttons>
            </Contents>
          </Display>
        </div>
      </Overlay>
    </div>
  );
};

export default Modal;