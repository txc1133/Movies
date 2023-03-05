import { useState, useEffect } from "react";
import { TABS } from "../constants";
import { getNowPlayingMovies, getTopRatedMovies, searchMovies } from "../services/movies";

function useFetchMovies(pathname, query = null) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovies(pageNumber = 1) {
    try {
      let response;
      if (pathname === TABS[0].endpoint || pathname === '/') {
        response = await getNowPlayingMovies(pageNumber);
      } else if (pathname === TABS[1].endpoint) {
        response = await getTopRatedMovies(pageNumber);
      } else if (pathname === '/search/movie') {
        response = await searchMovies(pageNumber, query);
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

  useEffect(() => {
    fetchMovies();
  }, [pathname, query]);

  return { movies, currentPage, totalPages, isLoading, fetchMovies };
}

export default useFetchMovies;
