import React from 'react';
import styled from 'styled-components';

const ThumbnailContainer = styled.div`
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

type Props = {
  imgSrc: string;
  videoSrc: string;
  showVideo: boolean;
};

const Thumbnail: React.FC<Props> = ({ imgSrc, videoSrc, showVideo }) => (
  <ThumbnailContainer>
    <ThumbnailImage src={imgSrc} />
    {showVideo && <ThumbnailVideo autoPlay src={videoSrc} />}
  </ThumbnailContainer>
);

export default Thumbnail;
