
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const TABS = [
    { id: 'now_playing', name: 'Now Playing', endpoint: '/movie/now_playing' },
    { id: 'top_rated', name: 'Top Rated', endpoint: '/movie/top_rated' },
];