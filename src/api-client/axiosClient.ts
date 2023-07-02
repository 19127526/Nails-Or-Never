import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
    async config => {
      config.headers.Authorization =  `JWT ${process.env.NEXT_PUBLIC_KEY_REQUEST}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    });

export default axiosClient
