import React from "react";

class FilterForm extends React.Component {
  state = {
    searchId: ""
  };

  handleChange = (e) => {
    this.setState({searchId: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleIdSearch(this.state.searchId)
  }

  render() {

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Search by id" onChange={this.handleChange} value={this.state.searchId}/>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default FilterForm;
