import React, { lazy, Suspense } from "react";

const LazyImage = lazy(() => import("../Image"));

function MovieCard({ movie }) {
    return (
        <div className="card h-100">
            <Suspense fallback={<div>Loading...</div>}>
                <LazyImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                />
            </Suspense>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard;