import React, { useEffect, useRef } from 'react';
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

const preventDefault = (e: React.SyntheticEvent): void => {
  e.preventDefault();
};

type Props = {
  game: TraPCollection.GameInfo;
  onGameHovered: (game: TraPCollection.GameInfo) => void;
  onGameUnhovered: () => void;
  className?: string;
};

const GameListItem: React.FC<Props> = ({
  game,
  onGameHovered,
  onGameUnhovered,
  className,
}) => {
  const [ref, isHovered] = useHovered<HTMLLIElement>();
  const wasHovered = useRef<boolean>(isHovered);

  useEffect(() => {
    if (isHovered && !wasHovered.current) {
      onGameHovered(game);
    }
    if (!isHovered && wasHovered.current) {
      onGameUnhovered();
    }
    wasHovered.current = isHovered;
  }, [isHovered, game, onGameHovered, onGameUnhovered]);

  return (
    <Container ref={ref} className={className}>
      <Link
        to={{
          pathname: '/game/detail',
        }}
        state={{ game }}
        onAuxClick={preventDefault}
      >
        <Thumbnail
          width='100%'
          height='100%'
          imgSrc={game.poster}
          videoSrc={game.video}
          showVideo={isHovered}
        />
      </Link>
    </Container>
  );
};

export default styled(GameListItem)``;
