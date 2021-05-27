import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  color: white;
  background-color: transparent;
  padding: 4px 8px;
  border: 2px solid white;
  border-radius: 4px;
  transition: 100ms transform;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonIcon = styled.span`
  margin-right: 4px;
`;

const ButtonText = styled.span``;

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
  iconName?: string;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ as, className, iconName, children, ...props }, ref) => (
    <ButtonContainer
      {...props}
      ref={ref}
      forwardedAs={as}
      className={className}
    >
      {iconName && (
        <ButtonIcon>
          <ion-icon name={iconName} />
        </ButtonIcon>
      )}
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  )
);

export default Button;
