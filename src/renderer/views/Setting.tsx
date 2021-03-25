import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

const PageContainer = styled.div`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const Header = styled.header`
  padding: 20px 0;
`;

const Content = styled.div`
  min-height: calc(100vh - 100px);
`;

const PageTitle = styled.h1``;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
  text-align: right;
`;

const SettingPage: React.FC = () => {
  useBackgroundVideo();

  return (
    <PageContainer>
      <Header>
        <PageTitle>Setting</PageTitle>
      </Header>
      <Content>content</Content>
      <Footer>
        <Link to='/title'>Link to title</Link>
      </Footer>
    </PageContainer>
  );
};

export default SettingPage;
