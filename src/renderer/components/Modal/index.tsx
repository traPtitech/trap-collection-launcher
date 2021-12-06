import React, { MouseEvent, useEffect } from 'react';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;

const Overlay = styled(Div)<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 2;
  transition: opacity ${(props) => props.theme.duration.normal} ease-out,
    visibility ${(props) => props.theme.duration.normal};

  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
`;

const Display = styled(Div)<{ $isOpen: boolean }>`
  position: relative;
  background-color: ${(props) => props.theme.colors.panel.primary};
  padding: 1.69rem; //27px
  width: 37.5rem; //600px
  height: auto;
  border-radius: 0.5rem; //8px
  transition: transform ${(props) => props.theme.duration.normal} ease-out;
  z-index: 3;

  transform: scale(${(props) => (props.$isOpen ? '1.0' : '0.98')});
`;

const Contents = styled(Div)`
  position: relative;
  padding: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem; //16px
`;

const ModalButton = styled(Div)<{
  $buttonType: 'cancel' | 'information' | 'warning';
}>`
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
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  transition: background-color ${(props) => props.theme.duration.normal}
    ease-out;
  background-color: ${(props) =>
    props.theme.colors.button[props.$buttonType].fill};
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.theme.colors.button[props.$buttonType].hover};
  }
  color: ${(props) => {
    switch (props.$buttonType) {
      case 'information':
        return props.theme.colors.text.opposite;
      case 'warning':
        return props.theme.colors.text.opposite;
      case 'cancel':
        return props.theme.colors.text.primary;
    }
  }};
  border-width: ${(props) => {
    switch (props.$buttonType) {
      case 'information':
        return '0';
      case 'warning':
        return '0';
      case 'cancel':
        return '0.125rem';
    }
  }};
  ${(props) => {
    if (props.$buttonType === 'cancel') {
      return `border-color: ${props.theme.colors.button.cancel.border}`;
    }
  }}
`;

const Buttons = styled(Div)`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Div)`
  text-align: center;
  color: ${(props) => props.theme.colors.text.header};
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
  noButton?: boolean;
};

const withBlur = (func: ModalEventHandler | undefined) => {
  return (e: React.MouseEvent<ModalElement, MouseEvent>) => {
    const active = document.activeElement as HTMLElement;
    active && active.blur();
    func && func(e);
  };
};

const Modal = ({
  children,
  onCancel,
  onOk,
  okButtonText,
  title,
  isOpen,
  modalType,
  noButton,
}: Props) => {
  useEffect(() => {
    const active = document.activeElement as HTMLElement;
    active && isOpen && active.blur();
  }, [isOpen]);

  return (
    <Overlay $isOpen={isOpen} onClick={onCancel}>
      <Display
        $isOpen={isOpen}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
        }}
      >
        <Contents>
          <Title>{title}</Title>
          <div>{children}</div>
          {noButton ? undefined : (
            <Buttons>
              <ModalButton $buttonType='cancel' onClick={withBlur(onCancel)}>
                キャンセル
              </ModalButton>
              <ModalButton
                $buttonType={modalType ?? 'information'}
                onClick={withBlur(onOk)}
              >
                {okButtonText}
              </ModalButton>
            </Buttons>
          )}
        </Contents>
      </Display>
    </Overlay>
  );
};

export default Modal;
