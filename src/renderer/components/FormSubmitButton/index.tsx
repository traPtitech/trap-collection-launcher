import styled from 'styled-components';

const FormSubmitButton = styled.input.attrs({
  type: 'submit',
})<{ outlined?: boolean }>`
  color: white;
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

export default FormSubmitButton;
