import React, { useContext } from 'react';
import styled from 'styled-components';
import { BackgroundStateContext } from '@/renderer/contexts/Background';

const BackgroundMask = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQI12NkYGDwYYACHwYGhv8ABscBmQkboJsAAAAASUVORK5CYII=');
  z-index: -1;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: 50% 50%;
  z-index: -2;

  background-color: black;
`;

const Background: React.FC = () => {
  const video = useContext(BackgroundStateContext);

  return (
    <>
      <BackgroundMask />
      <BackgroundVideo autoPlay loop src={video} />
    </>
  );
};

export default Background;
