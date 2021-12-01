import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  padding: 0;
`;

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  iconName: string;
  size?: 'large' | 'small' | number;
};

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ iconName, size, ...props }, ref) => (
    <ButtonContainer {...props} ref={ref}>
      <ion-icon
        name={iconName}
        size={typeof size === 'string' ? size : undefined}
        style={typeof size === 'number' ? { fontSize: size } : undefined}
      />
    </ButtonContainer>
  )
);

export default IconButton;
