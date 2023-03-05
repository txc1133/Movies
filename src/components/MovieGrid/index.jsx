import React from "react";
import MovieCard from "../MovieCard";
import "./MovieGrid.css";

function MovieGrid(props) {
  const { movies } = props;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card highlight">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
