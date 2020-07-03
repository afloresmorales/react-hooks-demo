import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      error: null,
      favoriteMovie: '',
      releaseYear: ''
    }
  }
  componentDidMount() {
    document.title = `Add your favorite movie`;
    fetch("https://reactnative.dev/movies.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            movies: result.movies
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.favoriteMovie !== this.state.favoriteMovie){
      document.title = `New Movie: ${this.state.favoriteMovie}`
    }
  }
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addMovieToFavoriteMoviesList = () => {
    const movieObject = {title: this.state.favoriteMovie, releaseYear: this.state.releaseYear};
    this.setState(state => {
      const movies = [...state.movies, movieObject];
      return {
        movies,
        favoriteMovie: '',
        releaseYear: '',
      };
    });
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <code>React Class</code>
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {
            this.state.movies.map((movie, index) => (
              <li key={index}>{movie.title}, {movie.releaseYear}</li>
            ))}
          </ul>
          <div>
            <input name='favoriteMovie' value={this.state.favoriteMovie} onChange={this.handleInputChange} placeholder='Favorite Movie' />
            <input name='releaseYear' value={this.state.releaseYear} onChange={this.handleInputChange} placeholder='Release Year' />
            <button onClick={this.addMovieToFavoriteMoviesList}>Add</button>
          </div>
          <span>{this.state.favoriteMovie}</span>
        </header>
      </div>
    );
  }
}

export default App;
