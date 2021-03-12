import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const Header = styled.header`
  margin: 20px 0;
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
  text-align: center;
  background-color: lightgray;
`;

const SettingPage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <PageTitle>Setting</PageTitle>
      </Header>
      <Content>content</Content>
      <Footer>
        <Link to='/'>Link to title</Link>
      </Footer>
    </PageContainer>
  );
};

export default SettingPage;
