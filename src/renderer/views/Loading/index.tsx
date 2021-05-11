import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

const PageContainer = styled.div`
  width: 75vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  position: relative;
`;

const changeOpacity = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`;

const Loading = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  animation: ${changeOpacity} 3s ease-in-out infinite;
`;

const LoadingPage: React.FC = () => {
  useBackgroundVideo();

  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push('/title');
    }, 2500);
  }, [history]);

  return (
    <PageContainer>
      <Loading>Loading...</Loading>
    </PageContainer>
  );
};

export default LoadingPage;
