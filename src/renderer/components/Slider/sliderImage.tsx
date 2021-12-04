import React from 'react';
import styled from 'styled-components';

const Image = ({ ...props }) => {
  return <img {...props} />;
};

const StyledImage = styled(Image)`
  background-color: #444444;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const SliderImage = ({ ...props }: Props) => {
  return <StyledImage {...props}></StyledImage>;
};

export default SliderImage;
