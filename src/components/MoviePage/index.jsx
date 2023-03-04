import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import { getNowPlayingMovies, getTopRatedMovies } from "../../services/movies";
import { useLocation } from "react-router-dom";
import { TABS } from "../../constants";
import "./MoviePage.css";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    fetchMovies();
  }, [pathname]);

  async function fetchMovies(pageNumber = 1) {
    try {
      let response;
      if (pathname === TABS[0].endpoint || pathname === '/') {
        response = await getNowPlayingMovies(pageNumber);
      } else if (pathname === TABS[1].endpoint) {
        response = await getTopRatedMovies(pageNumber);
      }

      setMovies(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePageChange(pageNumber) {
    fetchMovies(pageNumber);
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {movies.map((movie) => (
              <div key={movie.id} className="col">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

export default MoviePage;
