import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const LazyImage = lazy(() => import("../Image"));

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <div className="card h-100">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        </Suspense>
        <div className="card-body">
          <h5 className="card-title" style={{ textDecoration: "none", color: "black" }}>
            {movie.title}
          </h5>
          <p className="card-text" style={{ textDecoration: "none", color: "black" }}>
            {movie.release_date}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
