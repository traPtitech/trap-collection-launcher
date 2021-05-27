import styled from 'styled-components';

const FormSubmitButton = styled.input.attrs({
  type: 'submit',
})`
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

export default FormSubmitButton;
