import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const LazyImage = lazy(() => import("../Image"));

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <div className="card h-100">
        <Suspense fallback={<div>Loading...</div>}>
          <div
            className="card-img-top position-relative"
            style={{ paddingTop: "150%", overflow: "hidden" }}
          >
            <LazyImage
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              className="position-absolute top-0 start-0 w-100 h-100 image-fade-in"
              onLoad={(event) => {
                event.target.classList.add("loaded");
              }}
            />
          </div>
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
