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
  const [isRefreshing, setIsRefreshing] = useState(false);
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
      setIsRefreshing(false);
    }
  }

  function handlePageChange(pageNumber) {
    fetchMovies(pageNumber);
  }

  function handleTouchStart(event) {
    if (event.touches.length !== 1) return;
    setIsRefreshing(false);
  }

  function handleTouchMove(event) {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    const isTop = window.scrollY === 0;
    const isMovingDown = touch.clientY > startY;
    if (isTop && isMovingDown) {
      event.preventDefault();
      setIsRefreshing(true)
    }
  }

  function handleTouchEnd(event) {
    if (isRefreshing && window.scrollY === 0) {
      fetchMovies();
    }
  }

  let startY = 0;
  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, { passive: false });
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          {isRefreshing && <p>Refreshing...</p>}
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
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
