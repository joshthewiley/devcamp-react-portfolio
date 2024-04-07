import React from 'react';

export default function(props){
  return (
    <div>
      <h2>{props.match.params.slug} Portfolio Detail</h2>
    </div>
  );
}
