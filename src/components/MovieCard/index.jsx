import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../constants";
import "./MovieCard.css";

const LazyImage = lazy(() => import("../Image"));

function MovieCard({ movie }) {
  const { id, title, poster_path, release_date } = movie;

  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
      <div className="card h-100">
        <MovieImage posterPath={poster_path} title={title} />
        <MovieInfo title={title} releaseDate={release_date} />
      </div>
    </Link>
  );
}

function MovieImage({ posterPath, title }) {
  return (
    <div
      className="card-img-top position-relative"
      style={{ paddingTop: "150%", overflow: "hidden" }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <LazyImage
          src={`${IMAGE_URL}${posterPath}`}
          alt={`${title} Poster`}
          className="position-absolute top-0 start-0 w-100 h-100 image-fade-in"
          onLoad={(event) => {
            event.target.classList.add("loaded");
          }}
        />
      </Suspense>
    </div>
  );
}

function MovieInfo({ title, releaseDate }) {
  return (
    <div className="card-body">
      <h5 className="card-title" style={{ textDecoration: "none", color: "black" }}>
        {title}
      </h5>
      <p className="card-text" style={{ textDecoration: "none", color: "black" }}>
        {releaseDate}
      </p>
    </div>
  );
}

export default MovieCard;
