import axios from 'axios';
import { BASE_URL } from './assets/constants';

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const headers = config.headers;
    if (headers && token) {
        headers.Authorization = token;
    }
    return config;
});

export default instance;