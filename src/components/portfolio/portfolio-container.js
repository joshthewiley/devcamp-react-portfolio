import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from "./portfolio-items.js";

export default class PortfolioContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      data:[
      ]
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  changeTitle(){
    console.log(this,arguments)
      this.setState({"pageTitle":"Something else."});
  }
  handleFilter(filter){
    this.setState({
      data: this.state.data.filter(item => item.category === filter)
    });
  }
  portfolioItems(){
    return this.state.data.map(item => <PortfolioItem item={item} key={item.id} />);
  }
  getPortfolioItems(){
    axios.get("https://joshw.devcamp.space/portfolio/portfolio_items").then(response => {
      this.setState({
        data:response.data.portfolio_items,
        isLoading:false
      });
    }).catch(error => {
      console.error(error);
    });
  }
  componentDidMount() {
    this.getPortfolioItems();
  }
  render(){
    if(this.state.isLoading){
      return (<h2>Loading...</h2>)
    }
    return (
      <div className="portfolio-wrapper">
        <button onClick={() => {this.handleFilter("Web Design")}}>Web</button>
        <button onClick={() => {this.handleFilter("Mobile")}}>Mobile</button>
        <button onClick={() => {this.handleFilter("hardware")}}>Hardware</button>
        {this.portfolioItems()}
      </div>
    );
  }

}
