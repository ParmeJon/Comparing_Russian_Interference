import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    posts: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(json => this.setState({posts: json}))
  }

  render() {


    return (
      <div className="App">
        <h1>Russian Interference Data</h1>
        {this.state.posts.map(post => <div> {post.id }</div>)}
      </div>
    );
  }
}

export default App;
