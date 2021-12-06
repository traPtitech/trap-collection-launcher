import React from 'react';
import styled from 'styled-components';
import SliderImage from './sliderImage';

const BackGround = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
`;

type ImageWrapperProps = {
  bottom?: number;
  right?: number;
  width?: number;
  height?: number;
  hidden?: boolean;
};

const ImageWrapper = styled.div<ImageWrapperProps>`
  position: absolute;
  right: ${(props) => props.right}rem;
  bottom: ${(props) => props.bottom}rem;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  transition: all ${(props) => props.theme.duration.slider} ease-out;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
`;

export type Props = {
  selected: number;
  gameInfos: TraPCollection.GameInfo[];
};

const computePos = (index: number, len: number) => {
  const right =
    4.875 + 15 * (index - 2 * len) + (index >= 2 * len + 1 ? 12.5 : 0);
  const hidden = index >= 3 * len || index <= len - 1;
  const edge = index == 2 * len ? 25.0 : 12.5;
  return {
    bottom: 3.25,
    right,
    width: edge,
    height: edge,
    hidden,
  };
};

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

const Slider = ({ selected, gameInfos }: Props) => {
  const gameInfos4 = [...gameInfos, ...gameInfos, ...gameInfos, ...gameInfos];
  const listImages = gameInfos4.map((gameInfo, index) => (
    <ImageWrapper
      key={index}
      {...computePos(
        mod(selected - index, gameInfos4.length),
        gameInfos.length
      )}
    >
      <SliderImage src={gameInfo.poster} />
    </ImageWrapper>
  ));
  return <BackGround>{listImages}</BackGround>;
};

export default Slider;
