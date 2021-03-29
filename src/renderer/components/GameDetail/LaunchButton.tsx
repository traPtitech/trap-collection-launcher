import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Button = styled.button`
  color: white;
  background-color: transparent;
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 4px;
  transition: 100ms transform;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonIcon = styled.span`
  margin-right: 10px;
`;

const ButtonText = styled.span``;

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/* eslint-disable-next-line react/display-name */
const LaunchButton = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { t } = useTranslation();

    return (
      <Button {...props} ref={ref}>
        <ButtonIcon>
          <ion-icon name='play' />
        </ButtonIcon>
        <ButtonText>{t('launch')}!</ButtonText>
      </Button>
    );
  }
);

export default LaunchButton;
