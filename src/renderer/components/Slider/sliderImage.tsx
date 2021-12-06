import React, { useState } from 'react';
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
`;

const StyledImage = styled(Image)<{ $isLoad: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isLoad ? '100%' : '0%')};
  transition: opacity ${(props) => props.theme.duration.slider} ease-out;
`;

export type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const SliderImage = ({ ...props }: Props) => {
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
      ></StyledImage>
    </Wrapper>
  );
};

export default SliderImage;
