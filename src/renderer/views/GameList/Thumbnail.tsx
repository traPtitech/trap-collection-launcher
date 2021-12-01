import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDebounce } from '@/renderer/hooks/useDebounce';

const ThumbnailVideo = styled.video`
  object-fit: cover;
  object-position: 50% 50%;
`;

type Props = {
  width?: number | string;
  height?: number | string;
  imgSrc: string;
  videoSrc?: string;
  showVideo: boolean;
};

const Thumbnail: React.FC<Props> = ({
  width,
  height,
  imgSrc,
  videoSrc,
  showVideo: _showVideo,
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const showVideo = useDebounce(_showVideo, 100);

  useEffect(() => {
    const elem = ref?.current;

    if (showVideo) {
      elem?.play();
    } else {
      elem?.load();
    }
  }, [showVideo]);

  return (
    <ThumbnailVideo
      preload='auto'
      ref={ref}
      width={width}
      height={height}
      poster={imgSrc}
      src={videoSrc}
    />
  );
};

export default Thumbnail;
