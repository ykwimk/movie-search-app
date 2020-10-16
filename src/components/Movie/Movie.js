import React from 'react';

const DEFAULT_IMG = 'https://dummyimage.com/200'

const Movie = ({ args }) => {
  return (
    <div className="movie">
      <h2>{args.Title}</h2>
      <div>
        <img
          width="200"
          src={args.Poster === 'N/A' ? DEFAULT_IMG : args.Poster }
          alt={args.Title}
        />
      </div>
      <p>{args.Year}</p>
    </div>
  )
}

export default Movie;