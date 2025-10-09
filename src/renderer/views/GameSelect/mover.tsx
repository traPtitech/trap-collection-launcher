import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  left: 0;
  top: 4.5rem;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const LRButton = styled(Div)`
  pointer-events: auto;
  height: 100%;
  width: 5rem;
  background-color: ${(props) => props.theme.colors.button.transparent.fill};
  color: ${(props) => props.theme.colors.overlay.selectedSlide};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.overlay.selectedSlide};
    color: ${(props) => props.theme.colors.button.transparent.fill};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${(props) => props.theme.duration.normal} ease-out;
`;

const IconCircle = styled(Div)`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: currentColor;
`;

const Before = styled(MdNavigateBefore)`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.theme.colors.text.opposite};
`;

const Next = styled(MdNavigateNext)`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.theme.colors.text.opposite};
`;

export type Props = {
  onClickLeft?: () => void;
  onClickRight?: () => void;
};

const Mover = ({ onClickLeft, onClickRight }: Props) => {
  return (
    <Wrapper>
      <LRButton onClick={onClickLeft}>
        <IconCircle>
          <Before />
        </IconCircle>
      </LRButton>
      <LRButton onClick={onClickRight}>
        <IconCircle>
          <Next />
        </IconCircle>
      </LRButton>
    </Wrapper>
  );
};

export default Mover;
