import React, {
  useContext,
  useEffect,
  useRef,
  DetailedHTMLProps,
  VideoHTMLAttributes,
} from 'react';
import styled from 'styled-components';
import { NavigateContext } from '@/renderer/App';
import traPHoro from '@/renderer/assets/traP_horo.mp4';

const Div = ({ ...props }) => <div {...props} />;
const Video = ({
  ...props
}: DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>) => <video {...props} />;

const Wrapper = styled(Div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  user-select: none;
`;

const FullScreenVideo = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const SplashScreen = () => {
  const navigate = useContext(NavigateContext);

  return (
    <Wrapper>
      <FullScreenVideo
        muted
        autoPlay
        src={traPHoro}
        onEnded={() => {
          navigate && navigate('productKeySelect');
        }}
      />
    </Wrapper>
  );
};

export default SplashScreen;
