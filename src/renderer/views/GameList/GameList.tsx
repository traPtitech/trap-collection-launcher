import React, { useEffect, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import styled, { keyframes } from 'styled-components';
import GameListItem from './GameListItem';
import IconButton from '@/renderer/components/IconButton';

const GameListContainer = styled.div`
  width: 100%;
  position: relative;
`;

const fadeOpacity = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7;
  }
`;

const StyledSlider = styled(Slider)`
  & ${GameListItem} {
    box-sizing: content-box;
    border: 3px solid transparent;
    transition: border-color 0.2s;
    position: relative;
  }

  & .slick-current:hover ${GameListItem}:hover {
    border-color: white;
    z-index: 1;
  }

  & .slick-current:hover ${GameListItem}:not(:hover)::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    animation: ${fadeOpacity} 0.3s forwards;
  }
`;

const GameListItemContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ArrowContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const NextArrow = styled(IconButton).attrs({
  size: 48,
})`
  position: relative;
  float: right;
  top: calc(50% - 24px);
  right: -48px;
`;

const PrevArrow = styled(IconButton).attrs({
  size: 48,
})`
  position: relative;
  top: calc(50% - 24px);
  left: -48px;
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
  arrows: false,
};

const useScrollToSlide = (ref: React.RefObject<Slider>): void => {
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
  }, [ref]);
};

const GameList: React.FC<Props> = ({
  games,
  onGameUnhovered,
  onGameHovered,
}) => {
  const ref = useRef<Slider>(null);
  useScrollToSlide(ref);

  return (
    <GameListContainer>
      <ArrowContainer>
        <PrevArrow
          iconName='chevron-back-outline'
          onClick={ref.current?.slickPrev}
        />
        <NextArrow
          iconName='chevron-forward-outline'
          onClick={ref.current?.slickNext}
        />
      </ArrowContainer>
      <StyledSlider ref={ref} {...settings}>
        {games.map((game) => (
          <div key={game.id}>
            <GameListItemContainer>
              <GameListItem
                game={game}
                onGameHovered={onGameHovered}
                onGameUnhovered={onGameUnhovered}
              />
            </GameListItemContainer>
          </div>
        ))}
      </StyledSlider>
    </GameListContainer>
  );
};

export default GameList;
