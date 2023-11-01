import axios from 'axios';
import { parseCookies } from 'nookies';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
    const { cantest_token: token } = parseCookies(); // This will get the 'cantest_token' cookie
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default axiosInstance;