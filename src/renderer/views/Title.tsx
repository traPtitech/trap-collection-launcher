import React from 'react';
import { Link } from 'react-router-dom';

const Title: React.FC = () => (
  <>
    <h1>Title</h1>
    <p>
      <Link to='/game'>Link to game</Link>
    </p>
    <p>
      <Link to='/setting'>Link to setting</Link>
    </p>
  </>
);

export default Title;
