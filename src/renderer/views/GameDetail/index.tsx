import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/renderer/components/Button';
import IconButton from '@/renderer/components/IconButton';
import { useBackgroundVideo } from '@/renderer/contexts/Background';

const PageContainer = styled.div`
  width: 75vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.header`
  padding: 20px 0;
  height: 80px;
`;

const PageTitle = styled.h1`
  margin-bottom: 15px;
`;

const Content = styled.div``;

const Description = styled.p`
  color: white;
  margin-bottom: 30px;
`;

const GameDetail: React.FC = () => {
  const {
    state: { game },
  }: { state: { game: TraPCollection.GameInfo } } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useBackgroundVideo(game.video);

  const launch = () => {
    window.TraPCollectionAPI.invoke.launch(game.id);
  };

  return (
    <PageContainer>
      <Header>
        <IconButton
          iconName='chevron-back'
          size='large'
          onClick={() => navigate('/game')}
        />
      </Header>
      <Content>
        <PageTitle>{game.name}</PageTitle>
        <Description>{game.description}</Description>
        <Button outlined iconName='play' onClick={launch}>
          {t('launch')}!
        </Button>
      </Content>
    </PageContainer>
  );
};

export default GameDetail;
