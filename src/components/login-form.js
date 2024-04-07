import React from 'react'
import axios from 'axios';

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    axios.post("https://api.devcamp.space/sessions", {
        client: {
          email: this.state.email,
          password: this.state.password
        }
      },
      { withCredentials: true }
    ).then((response) => {
      if(response.data.status === "created"){
        this.setState({
          errorText: false
        });
        this.props.handleAuth(true);
      }
      else {
        this.setState({
          errorText: "Wrong Email or Password."
        });
        this.props.handleAuth(false);
      }
    })
    .catch((error) => {
      this.setState({
        errorText: "An Error Ocurred! :("
      });
      console.log(error);
      this.props.handleAuth(false);
    })
  }

  render () {
    return (
      <div className="login-form-wrapper">
        <h2>Dashboard Login</h2>
        <form onSubmit={this.handleSubmit} className="login-form">
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        <br/>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        <br />
          <button type="submit">Login</button>
          {this.state.errorText ? this.state.errorText : null}
        </form>
      </div>
    );
  }
}
