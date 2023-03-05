import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { getNowPlayingMovies, getTopRatedMovies } from "../../services/movies";
import { useLocation } from "react-router-dom";
import { TABS } from "../../constants";
import MovieList from "../MovieList";
import MovieGrid from "../MovieGrid";
import SegmentedControl from "../SegmentedControl";
import SkeletonMovieCard from "../SkeletonMovieCard";
import "../MovieGrid/MovieGrid.css";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
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
      {isLoading && (
        <div className="movie-grid">
          {Array.from({ length: 20 }, (_, index) => (
            <div key={index} className="movie-card">
              <SkeletonMovieCard />
            </div>
          ))}
        </div>
      )}
      {!isLoading && (
        <>
          {isRefreshing && <p>Refreshing...</p>}
          <div className="d-flex justify-content-end">
            <SegmentedControl
              activeTab={isGridView ? 'grid' : 'list'}
              onChange={(view) => setIsGridView(view === 'grid')}
            />
          </div>
          {isGridView ? (
            <MovieGrid movies={movies} />
          ) : (
            <MovieList movies={movies} />
          )}
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
