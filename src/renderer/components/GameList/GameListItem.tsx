import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import { useHovered } from '@/renderer/hooks/useHovered';

const Container = styled.li.attrs<{ className: string }>((props) => ({
  className: props.className,
}))`
  width: calc(37.5vw - 5px);
  height: 22vw;
  list-style: none;
`;

type Props = {
  game: TraPCollection.GameInfo;
  onGameHovered: (game: TraPCollection.GameInfo) => void;
};

const preventDefault = (e: React.SyntheticEvent): void => {
  e.preventDefault();
};

const GameListItem: React.FC<Props> = ({ game, onGameHovered }) => {
  const [ref, hovered] = useHovered<HTMLLIElement>();

  useEffect(() => {
    if (hovered) {
      onGameHovered(game);
    }
  }, [game, onGameHovered, hovered]);

  return (
    <Container ref={ref} className='game-list-item'>
      <Link
        to={{
          pathname: '/game/detail',
          state: { game },
        }}
        onAuxClick={preventDefault}
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
