import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';


function handleAxiosError(error: AxiosError) {
    if (error.response) {
        return Promise.reject(error.response.data);
    } else if (error.request) {
        return Promise.reject({ message: 'No response from server' });
    } else {
        return Promise.reject({ message: error.message });
    }
}

const FetchAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

FetchAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => Promise.reject(error)
);

FetchAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleAxiosError
);

export default FetchAxios;