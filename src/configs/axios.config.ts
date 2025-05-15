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
    const token = import.meta.env.VITE_API_ACCESS_TOKEN

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
