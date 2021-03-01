import React from 'react';
import { Link } from 'react-router-dom';

const GameList: React.FC = () => (
  <>
    <h1>Game List</h1>
    <p>
      <Link to='/'>Link to title</Link>
    </p>
    <p>
      <Link to='/game/1'>Link to Game 1</Link>
    </p>
  </>
);

export default GameList;
