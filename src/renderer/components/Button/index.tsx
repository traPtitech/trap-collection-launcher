import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button<{ outlined?: boolean }>`
  color: white;
  text-decoration: none;
  background-color: transparent;
  padding: 4px 8px;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => (props.outlined ? 'white' : 'transparent')};
  border-radius: 4px;
  transition: 100ms transform;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonIcon = styled.span`
  vertical-align: middle;
  margin-right: 4px;
`;

const ButtonText = styled.span``;

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
  iconName?: string;
  outlined?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ as, className, iconName, outlined, children, ...props }, ref) => (
    <ButtonContainer
      {...props}
      ref={ref}
      forwardedAs={as}
      className={className}
      outlined={outlined}
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
