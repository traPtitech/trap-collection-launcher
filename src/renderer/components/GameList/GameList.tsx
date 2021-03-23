import React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import GameListItem from './GameListItem';

const GameListItemContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  games: TraPCollection.GameInfo[];
  onGameHovered: (game: TraPCollection.GameInfo) => void;
  onGameUnhovered: () => void;
};

const settings: Settings = {
  className: 'center',
  centerPadding: '0px',
  centerMode: true,
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  rows: 2,
  slidesPerRow: 2,
  dots: true,
};

const GameList: React.FC<Props> = ({
  games,
  onGameUnhovered,
  onGameHovered,
}) => {
  return (
    <div onMouseLeave={onGameUnhovered}>
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game.id}>
            <GameListItemContainer>
              <GameListItem onGameHovered={onGameHovered} game={game} />
            </GameListItemContainer>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameList;
