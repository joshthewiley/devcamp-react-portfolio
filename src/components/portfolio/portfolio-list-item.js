import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function(props){
  return (
    <div className="portfolio-list-item">
      <img src={props.item.thumb_image_url} />
        <span>{props.item.name}</span>
        <div>
          <a onClick={() => {props.handleEditClick(props.item);}}>
            <FontAwesomeIcon icon="edit" />
          </a>
          <a onClick={() => {props.handleDeleteClick(props.item);}}>
            <FontAwesomeIcon icon="trash" />
          </a>
        </div>
    </div>
  );
}
