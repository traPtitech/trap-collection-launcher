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
  transition: all 0.2s ease-out;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
`;

export type Props = {
  selected: number;
  gameInfos?: Array<TraPCollection.GameInfo | undefined>;
};

const computePos = (index: number, len: number) => {
  console.log(index);
  const right = 4.875 + 15 * (index - len) + (index >= len + 1 ? 12.5 : 0);
  const hidden = index >= len * 2 + 1 || index <= 1;
  const edge = index == len ? 25.0 : 12.5;
  return {
    bottom: 3.25,
    right,
    width: edge,
    height: edge,
    hidden,
  };
};

const mod = (a: number, b: number) => {
  return (a % b) + (a < 0 && a % b !== 0 ? b : 0);
};

const Slider = ({ selected, gameInfos }: Props) => {
  const gameInfos3 = gameInfos?.concat(gameInfos?.concat(gameInfos));
  const listImages = gameInfos3?.map((gameInfo, index) => (
    <ImageWrapper
      key={index}
      {...computePos(
        mod(selected - index + 1, gameInfos3.length),
        gameInfos?.length || 0
      )}
    >
      <SliderImage src={gameInfo?.poster} />
    </ImageWrapper>
  ));
  return <BackGround>{listImages}</BackGround>;
};

export default Slider;
