import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: white;
  background-color: dodgerblue;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: 100ms transform;

  &:hover {
    padding: 6px 14px;
    border: 2px solid white;
    transform: scale(1.03);
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
  (props, ref) => (
    <Button {...props} ref={ref}>
      <ButtonIcon>
        <ion-icon name='play' />
      </ButtonIcon>
      <ButtonText>Play!</ButtonText>
    </Button>
  )
);

export default LaunchButton;
