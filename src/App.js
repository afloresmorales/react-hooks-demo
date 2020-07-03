import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useFieldState } from './hooks';
//"https://reactnative.dev/movies.json"
function App() {
  const [movies, setMovies] = useState([]);
  const [fields, handleFieldsInput] = useFieldState({
    favoriteMovie: '',
    releaseYear: ''
  });
  const {favoriteMovie, releaseYear} = fields;
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
          <input name='favoriteMovie' value={fields.favoriteMovie} onChange={handleFieldsInput} placeholder='Favorite movie' />
          <input value={fields.releaseYear} name='releaseYear' onChange={handleFieldsInput} placeholder='Release Year' />
          <button onClick={addFavoriteMovieToList}>Add</button>
        </div>
      </header>
    </div>
  );
}

export default App;
