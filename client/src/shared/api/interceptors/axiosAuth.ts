import axios from 'axios'
import { API_URL } from '../../config'
import { AuthResponse } from '../../models/user'

const axiosAuth = axios.create({
  withCredentials: true,
  baseURL: API_URL + 'api',
})

axiosAuth.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

axiosAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        })

        localStorage.setItem('token', response.data.accessToken)

        return axiosAuth.request(originalRequest)
      } catch (error) {
        console.error('Пользователь не авторизован')
      }
    }

    throw error
  }
)

export default axiosAuth
