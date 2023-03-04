import React from "react";
import MovieListItem from "../MovieListItem";

function MovieList(props) {
  const { movies } = props;

  return (
    <div className="row">
      {movies.map((movie) => (
        <div className="col-12 mb-3" key={movie.id}>
          <MovieListItem movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
