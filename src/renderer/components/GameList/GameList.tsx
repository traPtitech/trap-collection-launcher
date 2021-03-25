import React, { useEffect, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import GameListItem from './GameListItem';

const GameListContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSlider = styled(Slider)`
  & .slick-current:hover .game-list-item:hover {
    box-sizing: content-box;
    border: 3px solid white;
    z-index: 1;
  }

  & .slick-current:hover .game-list-item:not(:hover) {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.8;
    }
  }
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
      <StyledSlider ref={ref} {...settings}>
        {games.map((game) => (
          <div key={game.id}>
            <GameListItemContainer>
              <GameListItem onGameHovered={onGameHovered} game={game} />
            </GameListItemContainer>
          </div>
        ))}
      </StyledSlider>
    </GameListContainer>
  );
};

export default GameList;
