import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, * as ModalComponent from '@/renderer/components/Modal';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 2.25rem;
  height: 1.625rem;
  border: none;
  border-bottom: solid;
  border-width: 2px;
  outline: none;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  color: ${(props) => props.theme.colors.text.primary};
`;

const SendSeatNum = ({
  isOpen,
  onCancel,
}: Pick<ModalComponent.Props, 'isOpen' | 'onCancel'>) => {
  const [text, setText] = useState('');

  const setValidText = (str: string) => {
    setText(str.replace(/[^0-9]/gi, ''));
  };

  return (
    <Modal
      modalType='information'
      title='座席データを送信します'
      isOpen={isOpen}
      okButtonText='回答する'
      onCancel={onCancel}
    >
      <Wrapper>
        座席番号を入力してください。
        <StyledInput
          type='text'
          onChange={(e) => setValidText(e.target.value)}
          value={text}
        />
      </Wrapper>
    </Modal>
  );
};

export default SendSeatNum;
