import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export default class Blog extends Component {
  render () {
    return (
      <div>
        <h2>Blog</h2>
        <div>
          <Link to="/about">About</Link>
        </div>
      </div>
    );
  }
}
