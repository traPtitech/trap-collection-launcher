import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
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
`;

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
`;
    case 'warning':
      return `
border-width: 0;
background-color: #f26451;
color: #ffffff;
`;
    case 'cancel':
      return `
border-width: 0.125rem;
background-color: #ffffff;
color: #444444;
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
  onModalCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onModalOk?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  okButtonText?: string;
  title?: string;
};

const Modal = ({
  children,
  onModalCancel,
  onModalOk,
  okButtonText,
  title,
}: Props) => {
  return (
    <Overlay>
      <Display>
        <Contents>
          <Title>{title}</Title>
          <div>{children}</div>
          <Buttons>
            <Button buttonType='cancel' onClick={onModalCancel}>
              キャンセル
            </Button>
            <Button buttonType='information' onClick={onModalOk}>
              {okButtonText}
            </Button>
          </Buttons>
        </Contents>
      </Display>
    </Overlay>
  );
};

export default Modal;
