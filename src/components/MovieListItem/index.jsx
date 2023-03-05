import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import "../MovieCard/MovieCard.css";

const LazyImage = lazy(() => import("../Image"));

function MovieListItem({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <div className="row movie-list-item">
        <div className="col-3">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyImage
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              className="img-fluid rounded image-fade-in"
              onLoad={(event) => {
                event.target.classList.add("loaded");
              }}
            />
          </Suspense>
        </div>
        <div className="col-9">
          <h5 className="card-title" style={{ textDecoration: "none", color: "black" }}>{movie.title}</h5>
          <p className="card-text" style={{ textDecoration: "none", color: "black" }}>{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieListItem;
