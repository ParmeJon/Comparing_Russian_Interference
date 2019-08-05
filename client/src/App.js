import React from 'react';
import Post from './components/Post'
import SearchIdForm from './components/SearchIdForm'
import './App.css';

class App extends React.Component {

  state = {
    posts: [],
    startNum: 0,
    endNum: 50,
    property: "text",
    propertyFilter: "",
    order: "clicks",
    orderBy: "desc",
    errors: ""
  }

  componentDidMount() {
    fetch(`http://localhost:3000/posts?_sort=${this.state.order}&_order=${this.state.orderBy}&_start=${this.state.startNum}&_end=${this.state.endNum}`)
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));
  }

  handleIdSearch = (id) => {
    this.setState({errors: ""})
    if (id === "") {
      fetch(`http://localhost:3000/posts?_sort=${this.state.order}&_order=${this.state.orderBy}&_start=${this.state.startNum}&_end=${this.state.endNum}`)
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));
    } else {
      fetch(`http://localhost:3000/posts/${id}`)
        .then(res => {
          if (res.status === 404) {
            this.setState({errors: "Cannot find post with this id."})
          } 
           return res.json()
        })
        .then(json => {
            this.setState({ posts: [json]})
        })
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  searchWithFilter = (e) => {
    e.preventDefault()
     fetch(`http://localhost:3000/posts?_sort=${this.state.order}&_order=${this.state.orderBy}&_start=${this.state.startNum}&_end=${this.state.endNum}&${this.state.property}_like=${this.state.propertyFilter}`)
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));
  }

  render() {

    const posts = this.state.posts.map(post => <Post key={post.id} info={post}/>)

    return (
      <div className="App">
        <h1>Russian Interference Data</h1>
        <SearchIdForm handleIdSearch={this.handleIdSearch}/>

        <div>
          <form onSubmit={this.searchWithFilter}>

            <select value={this.state.property} name="property" onChange={this.handleChange} placeholder="Filter by property">
              <option value="text">Text Content</option>
              <option value="url">URL</option>
              <option value="pdf">PDF</option>
              <option value="image">Image Number</option>
              <option value="created">Created At</option>
              <option value="ended">Ended On</option>
            </select>

            <input type="text" name="propertyFilter" placeholder="Search for..." onChange={this.handleChange}></input>

            <select value={this.state.order} name="order" onChange={this.handleChange}>
              <option value="clicks">Clicks</option>
              <option value="impressions">Impressions</option>
            </select>

            <select value={this.state.orderBy} name="orderBy" onChange={this.handleChange}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>

            <button>Search</button>
          </form>
        </div>

        { this.state.errors !== "" ? this.state.errors : posts }
      </div>
    );
  }
}

export default App;
