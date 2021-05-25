import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Config } from '@/renderer/config';
import { useBackgroundVideo } from '@/renderer/contexts/Background';
import { useConfig } from '@/renderer/contexts/Config';

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

const isInitialized = async (config: Config): Promise<boolean> => {
  const settings = await Promise.all([
    window.TraPCollectionAPI.invoke.getProductKey(),
    window.TraPCollectionAPI.invoke.getSeatId(),
    window.TraPCollectionAPI.invoke.getSeatVersionId(),
  ]);

  if (!config.hasSeatSetting) {
    return settings[0] !== undefined;
  }

  return settings.every((v) => v !== undefined);
};

const LoadingPage: React.FC = () => {
  useBackgroundVideo();
  const config = useConfig();
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  useEffect(() => {
    isInitialized(config).then((b) => {
      if (b) {
        history.push('/loading');
      } else {
        setLoading(false);
      }
    });
  }, [history, config]);

  let content: JSX.Element | null = null;
  if (!loading) {
    content = <Link to='/loading'>Go to loading page</Link>;
  }

  return <PageContainer>{content}</PageContainer>;
};

export default LoadingPage;
