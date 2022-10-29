import axios from 'axios';

import { BASE_URL } from './assets/constants';

const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});

export {instance};