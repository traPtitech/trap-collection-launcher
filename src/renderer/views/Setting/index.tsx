import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

const BackButton = styled(Link)`
  display: inline-block;
  vertical-align: middle;
  margin-left: -8px;
  text-decoration: none;
  color: white;
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

  return (
    <PageContainer>
      <Header>
        <BackButton to='/title'>
          <ion-icon name='chevron-back' size='large' />
        </BackButton>
      </Header>
      <Content>
        <PageTitle>Setting</PageTitle>
        <P>content</P>
      </Content>
    </PageContainer>
  );
};

export default SettingPage;
