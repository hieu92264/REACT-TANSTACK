import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmd1eWVuIFRoZSBIaWV1IiwiZW1haWwiOiJoaWV1OTIyNjRAc3QudmltYXJ1LmVkdS52biIsImlkIjo2LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDcyOTU4NTcsImV4cCI6MTc0NzI5OTQ1N30.ealKKG_SAIpNod2P9wID6Zki_zpWsfK7rMw_xRBxtb4'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error.response || error.message),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    if (response) {
      return Promise.reject(response.data)
    }
    return Promise.reject(error.message)
  },
)

export default axiosInstance
