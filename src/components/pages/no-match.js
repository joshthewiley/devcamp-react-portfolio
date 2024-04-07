import React from 'react';
import { Link } from 'react-router-dom';

export default function(props){
  return (
    <div>
      <h2>Uh, oh!</h2>
      <p>It Looks like this page doesn't exist.</p>
      <Link exact to="/">Return to Home</Link>
    </div>
  );
}
