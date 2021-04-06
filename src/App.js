import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useFieldState } from './hooks';
//"https://reactnative.dev/movies.json"
function App() {
  const [movies, setMovies] = useState([]);
  const movieInput = useRef(null);
  const [fields, handleFieldsInput] = useFieldState({
    favoriteMovie: '',
    releaseYear: ''
  });
  const {favoriteMovie, releaseYear} = fields;
  useCallback(async () => {

  })
  useEffect(()=>{
    fetch("http://localhost:8000/movies")
    .then(res =>  res.json())
    .then(result => {
      setMovies(result)
    })
  }, [])

  useEffect(()=> {
    document.title = `New Movie: ${favoriteMovie}`
  },[favoriteMovie])
  const sortedMovies = useMemo(()=>{
    return movies.sort((a,b)=>{
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      return nameA < nameB ? -1 : 1;
    });
  }, [movies]);
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
            sortedMovies.map((movie, index)=> (
            <li key={index}>{movie.title}, {movie.releaseYear}</li>
            ))
          }
        </ul>
        <button onClick={()=>movieInput.current.focus()}>Focus</button>
        <div>
          <input ref={movieInput} name='favoriteMovie' value={fields.favoriteMovie} onChange={handleFieldsInput} placeholder='Favorite movie' />
          <input value={fields.releaseYear} name='releaseYear' onChange={handleFieldsInput} placeholder='Release Year' />
          <button onClick={addFavoriteMovieToList}>Add</button>
        </div>
      </header>
    </div>
  );
}

export default App;
