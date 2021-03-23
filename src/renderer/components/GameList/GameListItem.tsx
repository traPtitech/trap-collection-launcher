import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHovered } from '@/renderer/hooks/useHovered';
import Thumbnail from './Thumbnail';

const Container = styled.li`
  width: 475px;
  height: 267px;
  list-style: none;
`;

type Props = {
  game: TraPCollection.GameInfo;
  onGameHovered: (game: TraPCollection.GameInfo) => void;
};

const GameListItem: React.FC<Props> = ({ game, onGameHovered }) => {
  const [ref, hovered] = useHovered<HTMLLIElement>();

  useEffect(() => {
    if (hovered) {
      onGameHovered(game);
    }
  }, [game, onGameHovered, hovered]);

  return (
    <Container ref={ref}>
      <Link
        to={{
          pathname: '/game/detail',
          state: { game },
        }}
      >
        <Thumbnail
          width='100%'
          height='100%'
          imgSrc={game.poster}
          videoSrc={game.video}
          showVideo={hovered}
        />
      </Link>
    </Container>
  );
};

export default GameListItem;
