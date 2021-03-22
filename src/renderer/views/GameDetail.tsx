import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LaunchButton from '@/renderer/components/GameDetail/LaunchButton';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

const PageContainer = styled.div`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const Header = styled.header`
  padding-top: 20px;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  margin-bottom: 15px;
`;

const Content = styled.div``;

const Description = styled.p`
  color: white;
  margin-bottom: 30px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  vertical-align: middle;
  margin-left: -8px;
  text-decoration: none;
  color: white;
`;

const GameDetail: React.FC = () => {
  const {
    state: { game },
  } = useLocation<{ game: TraPCollection.GameInfo }>();
  useBackgroundVideo(game.video);

  const launch = () => {
    alert('Launch!');
  };

  return (
    <PageContainer>
      <Header>
        <BackButton to='/game'>
          <ion-icon name='chevron-back' size='large' />
        </BackButton>
      </Header>
      <Content>
        <PageTitle>{game.name}</PageTitle>
        <Description>{game.description}</Description>
        <LaunchButton onClick={launch} />
      </Content>
    </PageContainer>
  );
};

export default GameDetail;
