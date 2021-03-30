import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBackgroundVideo } from '@/renderer/contexts/Background';
import { useConfig } from '@/renderer/contexts/Config';

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

const StartButton = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  padding: 6px 12px;
  border: 2px solid white;
  border-radius: 4px;
  transition: 100ms transform;

  &:hover {
    transform: scale(1.1);
  }
`;

const StartButtonIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

const StartButtonText = styled.span`
  margin-right: 10px;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
`;

const SettingButton = styled(Link)`
  float: right;
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: 100ms transform;

  &:hover {
    transform: scale(1.1);
  }
`;

const SettingButtonIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

const SettingButtonText = styled.span`
  margin-right: 10px;
`;

const TitlePage: React.FC = () => {
  useBackgroundVideo();

  const { hasSettingPage } = useConfig();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <TitleContainer>
        <Title>
          traP Collection<Version>v3</Version>
        </Title>
        <StartButton to='/game'>
          <StartButtonIcon>
            <ion-icon name='play' />
          </StartButtonIcon>
          <StartButtonText>{t('start')}!</StartButtonText>
        </StartButton>
      </TitleContainer>
      {hasSettingPage && (
        <Footer>
          <SettingButton to='/setting'>
            <SettingButtonIcon>
              <ion-icon name='settings-sharp' />
            </SettingButtonIcon>
            <SettingButtonText>{t('setting')}</SettingButtonText>
          </SettingButton>
        </Footer>
      )}
    </PageContainer>
  );
};

export default TitlePage;
