import axios from 'axios'
import axiosClient from "./axiosClient";
const messageToken = ['Unauthorized', 'Token expired', 'Invalid token']

const axiosClientMulti = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

axiosClientMulti.interceptors.request.use(
    async config => {
        config.headers.Authorization =  `JWT ${localStorage.getItem('token')}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    });

axiosClientMulti.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error)=>{
        if(messageToken.filter(index => index == error?.response?.data?.message)[0] !=undefined) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
);

export default axiosClientMulti
