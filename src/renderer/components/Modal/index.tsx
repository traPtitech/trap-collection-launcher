import React from 'react';
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
  transition: opacity 0.1s ease-out, visibility 0.1s;

  visibility: ${(props) => {
    if (props.isOpen) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
  opacity: ${(props) => {
    if (props.isOpen) {
      return '1';
    } else {
      return '0';
    }
  }};
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
  transition: transform 0.1s ease-out;
  z-index: 3;

  transform: scale(
    ${(props) => {
      if (props.isOpen) {
        return '1.0';
      } else {
        return '0.9';
      }
    }}
  );
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
&:hover {
  background-color: #002f58;
}
`;
    case 'warning':
      return `
border-width: 0;
background-color: #f26451;
color: #ffffff;
&:hover {
  background-color:#bb3e2e;
}
`;
    case 'cancel':
      return `
border-width: 0.125rem;
background-color: #ffffff;
color: #444444;
&:hover {
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
  transition: background-color 0.1s ease-out;
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

const stopPropagationHandler = (
  e: React.MouseEvent<ModalElement, MouseEvent>,
  handler: ModalEventHandler | undefined
) => {
  e.stopPropagation();
  handler ? handler(e) : undefined;
};

const Modal = ({
  children,
  onCancel,
  onOk,
  okButtonText,
  title,
  isOpen,
}: Props) => {
  return (
    <div onClick={(e) => stopPropagationHandler(e, onCancel)}>
      <Overlay isOpen={isOpen}>
        <div onClick={(e) => stopPropagationHandler(e, undefined)}>
          <Display isOpen={isOpen}>
            <Contents>
              <Title>{title}</Title>
              <div>{children}</div>
              <Buttons>
                <Button
                  buttonType='cancel'
                  onClick={(e) => stopPropagationHandler(e, onCancel)}
                >
                  キャンセル
                </Button>
                <Button
                  buttonType='information'
                  onClick={(e) => stopPropagationHandler(e, onOk)}
                >
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
