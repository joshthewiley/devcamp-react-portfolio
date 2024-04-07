import React, {Component} from 'react';
import PortfolioListItem from './../portfolio/Portfolio-list-item';
import ManagerForm from './../portfolio/manager-form';

import axios from 'axios';

export default class PortfolioManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioItems: [],
      portfolioToEdit: undefined
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }
  portfolioItems(){
    return this.state.portfolioItems.map(item => <PortfolioListItem
      handleDeleteClick={this.handleDeleteClick}
      handleEditClick={this.handleEditClick}
      item={item}
      key={item.id}
      /> );
  }
  loadPortfolioItems(){
    axios.get("https://joshw.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc").then(response => {
      this.setState({
        portfolioItems: response.data.portfolio_items
      });
    }).catch(error => {
      console.error(error);
    })
  }
  handleEditClick(item){
    this.setState({
      portfolioToEdit: item
    });
  }
  handleDeleteClick(item){
    axios.delete(`https://joshw.devcamp.space/portfolio/portfolio_items/${item.id}`, { withCredentials: true })
    .then((response) => {
      this.setState({
        portfolioItems: this.state.portfolioItems.filter(i => i.id !== item.id)
      });
    }).catch((error) => {
      console.error(error);
    });

  }
  clearPortfolioToEdit(){
    this.setState({
      portfolioToEdit: undefined
    });
  }
  handleFormSubmit(item){
    if(this.state.portfolioItems.filter(portfolioItem => portfolioItem.id === item.id)){
      this.loadPortfolioItems();
    }
    else {
      this.setState({
        portfolioItems: [item].concat(this.state.portfolioItems)
      });
    }
  }
  componentDidMount() {
    this.loadPortfolioItems();
  }
  render () {
    return (
      <div>
        <div className="manager-cont">
          <div className="manager-form-cont">
            <ManagerForm
              handleFormSubmit={this.handleFormSubmit}
              portfolioToEdit={this.state.portfolioToEdit}
              clearPortfolioToEdit={this.clearPortfolioToEdit}
            />
          </div>
          <div className="portfolio-list">
            {this.portfolioItems()}
          </div>
        </div>
      </div>
    );
  }
}
