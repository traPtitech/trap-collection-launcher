import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHovered } from '@/renderer/hooks/useHovered';
import Thumbnail from './Thumbnail';

const Container = styled.li`
  width: 480px;
  height: 270px;
`;

type Props = {
  id: string;
  poster: string;
  video: string;
};

const GameListItem: React.FC<Props> = ({ poster, video }) => {
  const [ref, hovered] = useHovered<HTMLLIElement>();

  return (
    <Container ref={ref}>
      <Link to='/game/1'>
        <Thumbnail
          width='100%'
          height='100%'
          imgSrc={poster}
          videoSrc={video}
          showVideo={hovered}
        />
      </Link>
    </Container>
  );
};

export default GameListItem;
