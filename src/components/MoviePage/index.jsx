import { useState } from "react";
import { useLocation } from "react-router-dom";
import SegmentedControl from "../SegmentedControl";
import MovieList from "../MovieList";
import MovieGrid from "../MovieGrid";
import Pagination from "../Pagination";
import useFetchMovies from "../../hooks/useFetchMovies";
import useTouchRefresh from "../../hooks/useTouchRefresh";
import SkeletonMovieCard from "../SkeletonMovieCard";

function MoviePage() {
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  const {
    movies,
    currentPage,
    totalPages,
    isLoading,
    fetchMovies,
  } = useFetchMovies(pathname, query);
  const [isGridView, setIsGridView] = useState(true);
  const [isRefreshing] = useTouchRefresh(fetchMovies);

  function handlePageChange(pageNumber) {
    fetchMovies(pageNumber);
  }

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
