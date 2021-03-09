import React from 'react';
import styled from 'styled-components';

type WidthAndHeight = {
  width?: number | string;
  height?: number | string;
};

const ThumbnailContainer = styled.div<WidthAndHeight>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
`;

const ThumbnailImage = styled.img`
  /* fit to container */
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: 50% 50%;
  background-color: black;
`;

const ThumbnailVideo = styled.video`
  /* overlay */
  position: absolute;
  top: 0;
  left: 0;

  /* fit to container */
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: 50% 50%;
  background-color: black;
`;

type Props = WidthAndHeight & {
  imgSrc: string;
  videoSrc: string;
  showVideo: boolean;
};

const Thumbnail = React.forwardRef<HTMLDivElement, Props>(
  function ThumbnailInner({ width, height, imgSrc, videoSrc, showVideo }, ref) {
    return (
      <ThumbnailContainer width={width} height={height} ref={ref}>
        <ThumbnailImage src={imgSrc} />
        {showVideo && <ThumbnailVideo autoPlay src={videoSrc} />}
      </ThumbnailContainer>
    );
  }
);

export default Thumbnail;
