import React from "react";

class TargetPropertySearch extends React.Component {




  render() {
    return (
      <div className="App">
        <select value={this.props.value} onChange={this.props.handlePropertyChange} placeholder="Filter by property">
          <option value="text">Text Content</option>
          <option value="url">URL</option>
          <option value="pdf">PDF</option>
          <option value="image">Image Number</option>
          <option value="created">Created At</option>
          <option value="ended">Ended On</option>
        </select>
      </div>
    );
  }
}

export default TargetPropertySearch;
