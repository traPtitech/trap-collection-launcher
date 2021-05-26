import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: white;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  height: 30px;
  width: 100%;
  display: block;

  padding: 4px;

  color: white;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 4px;

  &::placeholder {
    color: white;
    opacity: 0.5;
  }
`;

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string };

const FormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, className, ...rest }, ref) => (
    <div className={className}>
      <Label>{label}</Label>
      <Input {...rest} ref={ref} />
    </div>
  )
);

export default FormInput;
