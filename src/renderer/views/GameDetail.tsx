import React from 'react';
import { Link, useParams } from 'react-router-dom';
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

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer>
      <Header>
        <PageTitle>こんにちは世界!</PageTitle>
      </Header>
      <Content>
        <Link to='/game'>Link to game list</Link>
      </Content>
    </PageContainer>
  );
};

export default GameDetail;
