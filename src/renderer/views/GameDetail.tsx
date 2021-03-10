import React from 'react';
import { Link, useParams } from 'react-router-dom';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <h1>Detail of Game {id}</h1>
      <Link to='/game'>Link to game list</Link>
    </>
  );
};

export default GameDetail;
