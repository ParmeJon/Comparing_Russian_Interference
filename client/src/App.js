import React from 'react';
import Post from './components/Post'
import FilterForm from './components/FilterForm'
import './App.css';

class App extends React.Component {

  state = {
    posts: [],
    startNum: 0,
    endNum: 100

  }

  componentDidMount() {
    fetch(`http://localhost:3000/posts?_start=${this.state.startNum}&_end=${this.state.endNum}`)
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));
  }

  handleIdSearch = (id) => {
    if (id === "") {
      fetch(`http://localhost:3000/posts?_start=${this.state.startNum}&_end=${this.state.endNum}`)
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));
    } else {
      fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(json => {
            this.setState({ posts: [json]})
        })
    }
  }

  render() {

    const posts = this.state.posts.map(post => <Post key={post.id} info={post}/>)

    return (
      <div className="App">
        <h1>Russian Interference Data</h1>
        <FilterForm handleIdSearch={this.handleIdSearch}/>
        { posts }
      </div>
    );
  }
}

export default App;
