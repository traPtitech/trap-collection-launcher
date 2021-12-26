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
  $bottom?: number;
  $right?: number;
  $scale?: number;
  $hidden?: boolean;
};

const Version = styled.div<{ $isSelected?: boolean }>`
  position: relative;
  margin: 1rem;
  opacity: ${(props) => (props.$isSelected ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.slider};
`;

const ImageWrapper = styled.div<ImageWrapperProps>`
  position: absolute;
  right: ${(props) => props.$right}rem;
  bottom: ${(props) => props.$bottom}rem;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.small};
  transform: scale(${(props) => props.$scale});
  transition: all ${(props) => props.theme.duration.slider} ease-out;
  visibility: ${(props) => (props.$hidden ? 'hidden' : 'visible')};
  transform-origin: bottom right;
`;

const computePos = (index: number, len: number, loopNumber: number) => {
  const $right =
    4.875 + 15 * (index - 2 * len) + (index >= 2 * len + 1 ? 12.5 : 0);
  const $hidden = index >= (loopNumber - 1) * len || index <= len - 1;
  const $scale = index == 2 * len ? 1.0 : 0.5;
  return {
    $bottom: 3.25,
    $right,
    $scale,
    $hidden,
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

export type Props = {
  selected: number;
  gameInfos: TraPCollection.GameInfo[];
  onClickGame?: (index: number) => void;
  onPlayGame?: () => void;
};

const Slider = ({ selected, gameInfos, onClickGame, onPlayGame }: Props) => {
  const loopNumber = 5;
  const gameInfosLoop = new Array<TraPCollection.GameInfo[]>(loopNumber)
    .fill(gameInfos)
    .flat();
  const listImages = gameInfosLoop.map((gameInfo, index) => {
    const len = gameInfos.length;
    return (
      <ImageWrapper
        key={index}
        {...computePos(
          mod(selected - index, loopNumber * len),
          len,
          loopNumber
        )}
      >
        <Version
          $isSelected={mod(selected - index, loopNumber * len) === 2 * len}
        >
          {gameInfo.version?.name}
        </Version>
        <SliderImage
          src={gameInfo.poster}
          isSelect={mod(selected - index, loopNumber * len) === len * 2}
          onClick={() => {
            onClickGame &&
              onClickGame(
                selected + 2 * len - mod(selected - index, loopNumber * len)
              );
            if (mod(selected - index, loopNumber * len) === 2 * len) {
              onPlayGame && onPlayGame();
            }
          }}
        />
      </ImageWrapper>
    );
  });
  return <BackGround>{listImages}</BackGround>;
};

export default Slider;
