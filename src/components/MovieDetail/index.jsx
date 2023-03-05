import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL } from "../../constants";
import { getMovieDetails } from "../../services/movies";
import "../MovieCard/MovieCard.css";

const LazyImage = lazy(() => import("../Image"));

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await getMovieDetails(id);
        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const {
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
    genres,
    runtime,
  } = movie;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyImage
              src={`${IMAGE_URL}${poster_path}`}
              alt={`${movie.title} Poster`}
              className="img-fluid rounded image-fade-in"
              onLoad={(event) => {
                event.target.classList.add("loaded");
              }}
            />
          </Suspense>
        </div>
        <div className="col-md-8">
          <h2>{title}</h2>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average} / 10
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {runtime} minutes
          </p>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;