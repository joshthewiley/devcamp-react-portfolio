import React, {Component} from 'react';
import axios from 'axios';

import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';

export default class ManagerForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "web",
      url: "",
      position: "",
      thumb_image: "",
      editMode: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.removeThumbImage = this.removeThumbImage.bind(this);
    this.thumbRef = React.createRef();
  }
  componentConfig(){
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }
  djsConfig(){
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }
  handleThumbDrop(){
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }
  removeThumbImage(){
    axios.delete(`https://joshw.devcamp.space/portfolio/delete-portfolio-image/${this.state
      .id}?image_type=thumb_image`, { withCredentials: true }).then( res => {
      this.setState({
        thumb_image_url: ""
      });
    });
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    axios({
      method: (this.state.editMode ? "PATCH" : "POST"),
      url: "https://joshw.devcamp.space/portfolio/portfolio_items" + (this.state.editMode ? "/" + this.state.id : ""),
      data: this.buildForm(),
      withCredentials: true
    })
    .then(response => {
      this.props.handleFormSubmit(response.data.portfolio_item);
      this.clearForm();
    }).catch(error => {
      console.error(error);
    });
  }
  buildForm(){
    let data = new FormData();
    data.append("portfolio_item[name]",this.state.name);
    data.append("portfolio_item[description]",this.state.description);
    data.append("portfolio_item[category]",this.state.category);
    data.append("portfolio_item[url]",this.state.url);
    data.append("portfolio_item[position]",this.state.position);
    if(this.state.thumb_image){
      data.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    return data;
  }
  clearForm(){
    this.thumbRef.current.dropzone.removeAllFiles();
    this.setState({
      name: "",
      description: "",
      category: "web",
      url: "",
      position: "",
      thumb_image: "",
      editMode: false
    });
  }

  componentDidUpdate() {
    if(this.props.portfolioToEdit){
      this.setState({
        ...this.props.portfolioToEdit,
        editMode: true
      });
      this.props.clearPortfolioToEdit();
    }
  }
  render () {
    return (
      <div>
        <form className="manager-form">
          <input
            name="name"
            type="text"
            placeholder="Title"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <input
            name="position"
            type="number"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="hardware">Hardware</option>
          </select>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          { this.state.editMode && this.state.thumb_image_url ?
            <div className="image-preview-cont">
              <img src={this.state.thumb_image_url}/>
              <a onClick={this.removeThumbImage}>Remove</a>
            </div> :
            <DropzoneComponent
              ref={this.thumbRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()} />
            }
          <button
            type="submit"
            className="submit-button"
            onClick={this.handleSubmit}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
