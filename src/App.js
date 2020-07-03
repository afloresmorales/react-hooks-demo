import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//"https://reactnative.dev/movies.json"
function App() {
  const [movies, setMovies] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [releaseYear, setReleaseYear] =  useState('');

  useEffect(()=>{
    fetch("https://reactnative.dev/movies.json")
    .then(res => res.json())
    .then(result => setMovies(result.movies))
  }, [])

  useEffect(()=> {
    document.title = `New Movie: ${favoriteMovie}`
  },[favoriteMovie])

  const addFavoriteMovieToList = () => {
    const movieObject = {title: favoriteMovie, releaseYear};
    const newMoviesList = [...movies, movieObject];
    setMovies(newMoviesList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <code>React Hooks</code>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {
            movies.map((movie, index)=> (
            <li key={index}>{movie.title}, {movie.releaseYear}</li>
            ))
          }
        </ul>
        <div>
          <input value={favoriteMovie} onChange={event => setFavoriteMovie(event.target.value)} placeholder='Favorite movie' />
          <input value={releaseYear} onChange={event => setReleaseYear(event.target.value)} placeholder='Release Year' />
          <button onClick={addFavoriteMovieToList}>Add</button>
        </div>
      </header>
    </div>
  );
}

export default App;
