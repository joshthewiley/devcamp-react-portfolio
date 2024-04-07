import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationContainer = props => {
  const handleSignOut = () => {
    axios.delete("https://api.devcamp.space/logout", { withCredentials: true}).then(response => {
      if(response.status === 200){
        props.handleLogout();
        props.history.push("/");
      }
    }).catch(error => {
      console.log("Error logging out.",error);
    });
  };
  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <NavLink exact to="/" className="nav-link" activeClassName="nav-link-active">Home</NavLink>
        <NavLink to="/about" className="nav-link" activeClassName="nav-link-active">About</NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="nav-link-active">Contact</NavLink>
        <NavLink to="/blog" className="nav-link" activeClassName="nav-link-active">Blog</NavLink>
        {props.isLoggedIn ?
          <NavLink to="/manager" className="nav-link" activeClassName="nav-link-active">Portfolio Manager</NavLink>
        : null}
      </div>
      <div className="right-side">Joshua W {props.isLoggedIn ? <a onClick={handleSignOut} className="logout-link"><FontAwesomeIcon icon="sign-out-alt"/></a> : null}</div>
    </div>
  );
}
export default withRouter(NavigationContainer);
