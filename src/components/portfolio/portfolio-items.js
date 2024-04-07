import React from "react";
import { Link } from 'react-router-dom';
export default function(props) {
    const {id, name, description, thumb_image_url, logo_url} = props.item;
    return (
        <div className="portfolio-item" style={{
            backgroundImage: `url(${thumb_image_url})`
          }}>
          {/*<Link to={`/portfolio/${id}`}>*/}
            <div className="portfolio-item-cover">
              <h2>{name}</h2>
              <p className="portfolio-description">{description}</p>
            </div>
          {/*</Link>*/}
        </div>
    );
}
