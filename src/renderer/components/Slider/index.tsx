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
  switch (index) {
    case 0:
      return {
        bottom: 3.25,
        right: -10.125,
        width: 12.5,
        height: 12.5,
      };
    case 1:
      return { bottom: 3.25, right: 4.875, width: 25, height: 25 };
    case len - 1:
      return {
        bottom: 3.25,
        right: -25.125,
        width: 12.5,
        height: 12.5,
      };
    case len - 2:
      return {
        bottom: 3.25,
        right: (len - 4) * 15 + 32.375,
        width: 12.5,
        height: 12.5,
        hidden: true,
      };
    default:
      return {
        bottom: 3.25,
        right: (index - 2) * 15 + 32.375,
        width: 12.5,
        height: 12.5,
      };
  }
};

const mod = (a: number, b: number) => {
  return (a % b) + (a < 0 && a % b !== 0 ? b : 0);
};

const Slider = ({ selected, gameInfos }: Props) => {
  const listImages = gameInfos?.map((gameInfo, index) => (
    <ImageWrapper
      key={index}
      {...computePos(
        mod(selected - index + 1, gameInfos.length),
        gameInfos.length
      )}
    >
      <SliderImage src={gameInfo?.poster} />
    </ImageWrapper>
  ));
  return <BackGround>{listImages}</BackGround>;
};

export default Slider;
