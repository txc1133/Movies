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
    if (error.response.status === 404) {
      alert("API not found");
    } else if (error.response.status === 500) {
      alert("Internal server error");
    } else {
      alert("API error");
    }
    console.error(`Error occurred in API call: ${error}`);
    throw error;
  }
);

export default axiosInstance;