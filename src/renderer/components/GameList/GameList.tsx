import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import GameListItem from './GameListItem';

const GameListContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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

const useScrollToSlide = (): React.Ref<Slider> => {
  const ref = useRef<Slider>(null);

  useEffect(() => {
    const listener = (ev: WheelEvent): void => {
      if (ev.deltaY > 0) {
        ref.current?.slickNext();
      } else {
        ref.current?.slickPrev();
      }
    };

    window.addEventListener('wheel', listener);
    return () => {
      window.removeEventListener('wheel', listener);
    };
  }, []);

  return ref;
};

const GameList: React.FC<Props> = ({
  games,
  onGameUnhovered,
  onGameHovered,
}) => {
  const ref = useScrollToSlide();

  return (
    <GameListContainer onMouseLeave={onGameUnhovered}>
      <Slider ref={ref} {...settings}>
        {games.map((game) => (
          <div key={game.id}>
            <GameListItemContainer>
              <GameListItem onGameHovered={onGameHovered} game={game} />
            </GameListItemContainer>
          </div>
        ))}
      </Slider>
    </GameListContainer>
  );
};

export default GameList;
