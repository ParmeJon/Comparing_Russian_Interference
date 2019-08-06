import React from "react";

class SearchIdForm extends React.Component {
  state = {
    searchId: ""
  };

  handleChange = (e) => {
    this.setState({searchId: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleIdSearch(this.state.searchId)
    this.setState({searchId: ""})
  }

  render() {

    return (
      <div className="search-id-form">
        <form onSubmit={this.handleSubmit}>
          <input className="id-input theme-input" placeholder="Search by id" onChange={this.handleChange} value={this.state.searchId}/>
          <button className="id-button theme-button">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchIdForm;
