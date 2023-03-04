import { API_BASE_URL, TABS } from '../constants';
import axiosInstance from './api';

export async function getNowPlayingMovies(pageNumber = 1) {
    const url = `${API_BASE_URL}/movie/now_playing`;
    const params = {
        page: pageNumber,
    };
    const response = await axiosInstance.get(url, { params });
    return response;
}

export async function getTopRatedMovies(pageNumber = 1) {
    const url = `${API_BASE_URL}/movie/top_rated`;
    const params = {
        page: pageNumber,
    };
    const response = await axiosInstance.get(url, { params });
    return response;
}

export async function getMovieDetails(id) {
    const url = `${API_BASE_URL}/movie/${id}`;
    const response = await axiosInstance.get(url);
    return response;
}