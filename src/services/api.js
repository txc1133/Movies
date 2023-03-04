import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(`Error occurred in API call: ${error}`);
        throw error;
    }
);

export default axiosInstance;