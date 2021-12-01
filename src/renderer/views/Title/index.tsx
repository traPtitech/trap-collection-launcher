import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/renderer/components/Button';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

const PageContainer = styled.div`
  width: 75vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;

  position: relative;
`;

const TitleContainer = styled.header`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 15px;
`;

const Version = styled.span`
  margin-left: 10px;
  font-size: 32px;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const TitlePage: React.FC = () => {
  useBackgroundVideo();

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <TitleContainer>
        <Title>
          traP Collection<Version>v3</Version>
        </Title>
        <Button outlined iconName='play' onClick={() => navigate('/game')}>
          {t('start')}!
        </Button>
      </TitleContainer>
      <Footer>
        <Button iconName='settings-sharp' onClick={() => navigate('/setting')}>
          {t('setting')}
        </Button>
      </Footer>
    </PageContainer>
  );
};

export default TitlePage;
