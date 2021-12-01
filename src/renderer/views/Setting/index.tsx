import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '@/renderer/components/IconButton';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

const PageContainer = styled.div`
  width: 75vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const Header = styled.header`
  padding: 20px 0;
  height: 80px;
`;

const Content = styled.div`
  min-height: calc(100% - 80px);
`;

const PageTitle = styled.h1`
  margin-bottom: 15px;
`;

const P = styled.p`
  color: white;
`;

const SettingPage: React.FC = () => {
  useBackgroundVideo();

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header>
        <IconButton
          iconName='chevron-back'
          size='large'
          onClick={() => navigate('/title')}
        />
      </Header>
      <Content>
        <PageTitle>{t('setting')}</PageTitle>
        <P>content</P>
      </Content>
    </PageContainer>
  );
};

export default SettingPage;
