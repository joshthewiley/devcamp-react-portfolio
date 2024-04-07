import React, { Component } from 'react';

import LoginForm from "./../login-form.js"
import loginImg from "./../../../static/assets/images/login.jpg";


export default class Login extends Component {
  constructor(props){
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }
  handleAuth(successful){
      this.props.handleLogin(successful);
      if(successful){
        this.props.history.push("/");
      }
  }
  render () {
    return (
      <div className="login-page-wrapper">
        <div className="left-column" style={{
            backgroundImage: `url(${loginImg})`
          }}>
        </div>
        <LoginForm handleAuth={this.handleAuth} />
      </div>
    );
  }
}
