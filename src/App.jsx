import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TopBar from './components/TopBar';
import { Route, Routes } from "react-router-dom";
import MoviePage from './components/MoviePage';
import MovieDetail from './components/MovieDetail';
import { TABS } from './constants';

function App() {
  return (
    <>
      <TopBar tabs={TABS} />
      <Routes>
        <Route path="/" element={<MoviePage />} />
        <Route exact path="/movie/now_playing" element={<MoviePage />} />
        <Route exact path="/movie/top_rated" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search/movie" element={<MoviePage />} />
      </Routes>
    </>
  );
}

export default App;
