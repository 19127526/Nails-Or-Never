import axios from 'axios'
const messageToken = ['Unauthorized', 'Token expired', 'Invalid token']
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
axiosClient.interceptors.request.use(
    async config => {
        config.headers.Authorization =  `JWT ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axiosClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error)=>{
        console.log(error)
        if(messageToken.filter(index => index == error?.response?.data?.message)[0] !=undefined) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
);

export default axiosClient
