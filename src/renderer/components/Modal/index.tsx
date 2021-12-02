import React from 'react';

export type Props = {
  children: React.ReactNode;
  modalType?: 'infomation' | 'warning';
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onOk?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  okButtonText?: string;
};

const Modal = ({ children, onCancel, onOk, okButtonText }: Props) => {
  return (
    <div>
      <div>{children}</div>
      <div>
        <button onClick={onCancel}> キャンセル </button>
        <button onClick={onOk}> {okButtonText} </button>
      </div>
    </div>
  );
};

export default Modal;
