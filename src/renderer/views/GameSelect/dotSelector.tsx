import React from 'react';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;

const Wrapper = styled(Div)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0.4rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled(Div)`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: currentColor;
  margin: 1rem;
  box-shadow: 0px 3px 6px ${(props) => props.theme.colors.shadow.dot};
`;

const DotWrapper = styled(Div)<{ $isSelected: boolean }>`
  color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.button.dot.hover
      : props.theme.colors.button.dot.fill};
  &:hover {
    color: ${(props) => props.theme.colors.button.dot.hover};
  }
  transition: color ${(props) => props.theme.duration.normal} ease-out;
  cursor: pointer;
  width: auto;
  height: auto;
`;

/**
 * Returns the remainder of a divided by b.
 * @param a {number} Dividend
 * @param b {number} Divisor
 * @returns {number} The remainder of a divided by b
 */
const mod = (a: number, b: number) => {
  const m = a % b;
  return m + (a < 0 && m !== 0 ? b : 0);
};

export type Props = {
  length: number;
  selectedGame: number;
  onClickGame?: (index: number) => void;
};

const DotSelector = ({ length, selectedGame, onClickGame }: Props) => {
  const dots = [...Array(length)].map((_, i) => (
    <DotWrapper
      key={i}
      onClick={() =>
        onClickGame && onClickGame(selectedGame + i - mod(selectedGame, length))
      }
      $isSelected={mod(selectedGame, length) === i}
    >
      <Dot />
    </DotWrapper>
  ));

  return <Wrapper>{dots}</Wrapper>;
};

export default DotSelector;
