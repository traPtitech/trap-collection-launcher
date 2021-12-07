import React, { useState } from 'react';
import { MdPlayCircleOutline } from 'react-icons/md';
import styled from 'styled-components';

const Div = ({ ...props }) => {
  return <div {...props} />;
};

const Image = ({ ...props }) => {
  return <img {...props} />;
};

const Wrapper = styled(Div)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.panel.primary};
  border-radius: 0.5rem;
`;

const StyledImage = styled(Image)<{ $isLoad: boolean; $isSelect: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isLoad ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.normal} ease-out,
    transform ${(props) => props.theme.duration.normal} ease-out;
  border-radius: 0.5rem;
  &:hover {
    transform: scale(${(props) => (props.$isSelect ? '1.0' : '1.1')});
  }
  cursor: pointer;
`;

const ImageBorder = styled(Div)<{ $isSelect: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  color: ${(props) => props.theme.colors.button.information.fill};
  border-color: ${(props) => props.theme.colors.button.information.fill};
  border: solid;
  border-width: 0.375rem;
  border-radius: 0.5rem;
  opacity: ${(props) => (props.$isSelect ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.slider};
`;

const ImageOverlay = styled(Div)<{ $isSelect: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.overlay.selectedSlide};
  opacity: 0%;
  &:hover {
    opacity: 100%;
  }
  cursor: pointer;
  transition: all ${(props) => props.theme.duration.normal} ease-out;
  border-radius: 0.5rem;
  pointer-events: ${(props) => (props.$isSelect ? 'auto' : 'none')};
`;

const PlayText = styled(Div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6.25rem;
  background-color: ${(props) => props.theme.colors.button.information.fill};
  color: ${(props) => props.theme.colors.text.opposite};
  font-size: 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled(MdPlayCircleOutline)`
  position: relative;
  display: block;
  top: 6.35rem;
  margin-right: auto;
  margin-left: auto;
  color: ${(props) => props.theme.colors.button.play.fill};
  height: 10rem;
  width: 10rem;
`;

export type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & { isSelect: boolean };

const SliderImage = ({ isSelect, ...props }: Props) => {
  const [isLoad, setIsLoad] = useState(false);

  const onLoadHandler = () => {
    setIsLoad(true);
  };

  return (
    <Wrapper>
      <StyledImage
        {...props}
        onLoad={onLoadHandler}
        $isLoad={isLoad}
        $isSelect={isSelect}
      />
      <ImageOverlay $isSelect={isSelect}>
        <PlayText>このゲームで遊ぶ</PlayText>
        <PlayButton />
      </ImageOverlay>
      <ImageBorder $isSelect={isSelect} />
    </Wrapper>
  );
};

export default SliderImage;
