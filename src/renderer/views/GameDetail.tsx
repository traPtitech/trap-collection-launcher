import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useVideoAsBackground } from '@/renderer/hooks/useVideoAsBackground';

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
  const {
    state: { game },
  } = useLocation<{ game: TraPCollection.GameInfo }>();
  useVideoAsBackground(game.video);

  return (
    <PageContainer>
      <Header>
        <PageTitle>{game.name}</PageTitle>
      </Header>
      <Content>
        <Link to='/game'>Back to game list</Link>
      </Content>
    </PageContainer>
  );
};

export default GameDetail;
