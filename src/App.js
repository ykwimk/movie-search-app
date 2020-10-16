import React, { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie';
import Search from './components/Search/Search';

const MOVIE_API_KEY = 'http://www.omdbapi.com/?s=dark&apikey=4ff72935'

const initialState = {
  movies: [],
  isLoading: true,
  errorMessage: null,
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        movies: action.data
      }
    case 'SEARCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      }
    default:
      return state
  }
}

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(MOVIE_API_KEY)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type: 'SEARCH_SUCCESS',
        data: jsonResponse.Search
      })
    })
  }, [])

  const handleSearch = (value) => {
    dispatch({
      type: 'SEARCH_REQUEST',
    })
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=4a3b711b`)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === 'True') {
        dispatch({
          type: 'SEARCH_SUCCESS',
          data: jsonResponse.Search
        })
      } else {
        dispatch({
          type: 'SEARCH_FAILURE',
          error: jsonResponse.Error
        })
      }
    })
  }

  const { movies, isLoading, errorMessage } = state
  return (
    <div className="App">
      <Header />
      <Search handleSearch={handleSearch} />
      <p className="intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {isLoading && !errorMessage ?
          <span>loading...</span>
        : !isLoading && errorMessage ?
          <div className="errorMessage">{errorMessage}</div>
        : movies.map((args) => <Movie key={args.imdbID} args={args} />)
        }
      </div>
    </div>
  );
}

export default App;
