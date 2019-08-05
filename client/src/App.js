import React from 'react';
import Post from './components/Post'
import SearchIdForm from './components/SearchIdForm'
import ScrollButton from './components/ScrollButton'
import './App.css';

class App extends React.Component {

  state = {
    posts: [],
    startNum: 0,
    endNum: 50,
    interval: 50,
    property: "text",
    propertyFilter: "",
    order: "clicks",
    orderBy: "desc",
    errors: "",
    morePosts: true
  }

  componentDidMount() {
    this.loadUser()
  }

  handleIdSearch = async (id) => {
    await this.setState({errors: "", startNum: 0, endNum: this.state.interval})
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

  searchWithFilter = async (e) => {
    e.preventDefault()
    await this.setState({startNum: 0, endNum: this.state.interval, morePosts: true})
     fetch(`http://localhost:3000/posts?_sort=${this.state.order}&_order=${this.state.orderBy}&_start=${this.state.startNum}&_end=${this.state.endNum}&${this.state.property}_like=${this.state.propertyFilter}`)
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));
  }

  loadUser = () => {
      fetch(`http://localhost:3000/posts?_sort=${this.state.order}&_order=${this.state.orderBy}&_start=${this.state.startNum}&_end=${this.state.endNum}&${this.state.property}_like=${this.state.propertyFilter}`)
      .then(res => res.json())
      .then(json => {
        if (json.length < 1) {
          this.setState({ morePosts: false})
        } else {
          this.setState({ posts: [...this.state.posts, ...json] })
        }
      });
  }

  loadMore = () => {
    this.setState({startNum: this.state.endNum, endNum: parseInt(this.state.endNum) + parseInt(this.state.interval) },
      this.loadUser 
      )

  }

  handleInterval = async (e) => {
    await this.setState({ interval: e.target.value, endNum: e.target.value, startNum: 0})
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
            <div className="select">
              <select value={this.state.property} name="property" onChange={this.handleChange} placeholder="Filter by property">
                <option value="text">Text Content</option>
                <option value="url">URL</option>
                <option value="pdf">PDF</option>
                <option value="image">Image Number</option>
                <option value="created">Created At</option>
                <option value="ended">Ended On</option>
              </select>
            </div>

            <input type="text" name="propertyFilter" placeholder="Search for..." onChange={this.handleChange}></input>
           
            <div className="select">
              <select value={this.state.order} name="order" onChange={this.handleChange}>
                <option value="clicks">Clicks</option>
                <option value="impressions">Impressions</option>
              </select>
            </div>

            <div className="select">
              <select value={this.state.orderBy} name="orderBy" onChange={this.handleChange}>
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>

            <button>Search</button>
          </form>
        </div>

        <div className="select">
          <select value={this.state.interval} name="interval" onChange={this.handleInterval}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        { this.state.errors !== "" ? this.state.errors : posts }
        { posts.length > 1 && this.state.morePosts ? <button onClick={this.loadMore}> Load More </button> : <p>No More</p>}
      
        <ScrollButton scrollStepInPx="100" delayInMs="5"/>
      </div>
    );
  }
}

export default App;
