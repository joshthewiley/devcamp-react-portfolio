import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import axios from 'axios';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSignOutAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faSignOutAlt,faTrash,faEdit);

import NavigationContainer from "./navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioManager from "./pages/manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";
import Login from "./pages/login";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin(successful){
    this.setState({
      isLoggedIn: successful
    });
  }
  handleLogout(){
    this.setState({
      isLoggedIn: false
    });
  }
  checkLogin(){
    axios.get("https://api.devcamp.space/logged_in", { withCredentials: true }).then(response => {
      if(this.state.isLoggedIn !== response.data.logged_in){
        this.setState({
          isLoggedIn: response.data.logged_in
        });
      }
      else {
        return this.state.isLoggedIn;
      }
    })
    .catch((e) => {
      console.error(e);
    });
  }
  componentDidMount() {
    this.checkLogin();
  }
  render() {
    return (
      <div className='app'>
        <Router>
          <div>
              <NavigationContainer
                isLoggedIn={this.state.isLoggedIn}
                handleLogout={this.handleLogout}
              />
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/blog" component={Blog}/>
                {this.state.isLoggedIn ? <Route path="/manager" component={PortfolioManager}/> : null}
                <Route exact path="/portfolio/:slug" component={PortfolioDetail}/>
                <Route path="/login" render={
                    props => (<Login {...props} handleLogin={this.handleLogin} />)
                  }/>
                <Route component={NoMatch}/>
            </Switch>
        </div>
        </Router>
      </div>
    );
  }
}
