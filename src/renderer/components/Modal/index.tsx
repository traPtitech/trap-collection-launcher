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
  transition: opacity 0.08s, visibility 0.08s;
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

const Display = styled.div`
  position: relative;
  background-color: #f3f3f3;
  padding: 1.69rem; //27px
  width: 37.5rem; //600px
  height: auto;
  border-radius: 0.5rem; //8px
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
  transition: background-color 0.06s;
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

export type Props = {
  children: React.ReactNode;
  modalType?: 'information' | 'warning';
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onOk?: React.MouseEventHandler<HTMLButtonElement> | undefined;
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
}: Props) => {
  return (
    <Overlay isOpen={isOpen}>
      <Display>
        <Contents>
          <Title>{title}</Title>
          <div>{children}</div>
          <Buttons>
            <Button buttonType='cancel' onClick={onCancel}>
              キャンセル
            </Button>
            <Button buttonType='information' onClick={onOk}>
              {okButtonText}
            </Button>
          </Buttons>
        </Contents>
      </Display>
    </Overlay>
  );
};

export default Modal;
