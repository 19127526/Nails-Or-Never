import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export default axiosClient
