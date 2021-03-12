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
  padding: 20px 0;
`;

const PageTitle = styled.h1``;

const Content = styled.div``;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
`;

const FooterLinkContainer = styled.div`
  float: right;
  padding-right: 20px;
`;

const TitlePage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <PageTitle>traP Collection</PageTitle>
      </Header>
      <Content>
        <Link to='/game'>Play!</Link>
      </Content>
      <Footer>
        <FooterLinkContainer>
          <Link to='/setting'>Link to setting</Link>
        </FooterLinkContainer>
      </Footer>
    </PageContainer>
  );
};

export default TitlePage;
