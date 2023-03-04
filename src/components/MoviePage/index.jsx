import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import { getNowPlayingMovies, getTopRatedMovies } from "../../services/movies";
import TopBar from "../TopBar";

function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedTab, setSelectedTab] = useState("now_playing");

    useEffect(() => {
        setCurrentPage(1);
        fetchMovies();
    }, [selectedTab]);

    async function fetchMovies(pageNumber = 1) {
        try {
            const response =
                selectedTab === "now_playing"
                    ? await getNowPlayingMovies(pageNumber)
                    : await getTopRatedMovies(pageNumber);

            setMovies(response.results);
            setTotalPages(response.total_pages);
            setCurrentPage(pageNumber);
        } catch (error) {
            console.error(error);
        }
    }

    function handlePageChange(pageNumber) {
        fetchMovies(pageNumber);
    }

    function handleTabChange(tab) {
        setSelectedTab(tab);
    }

    return (
        <>
            <TopBar
                tabs={[
                    { id: "now_playing", name: "Now Playing" },
                    { id: "top_rated", name: "Top Rated" },
                ]}
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
            />
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
    );
}

export default MoviePage;
