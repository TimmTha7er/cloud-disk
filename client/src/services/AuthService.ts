import axiosAuth from '../utils/axiosAuth'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/user'

class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return axiosAuth.post<AuthResponse>('/auth/login', { email, password })
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return axiosAuth.post<AuthResponse>('/auth/registration', { email, password })
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return axiosAuth.get<AuthResponse>('/auth/refresh')
  }

  static async logout(): Promise<void> {
    return axiosAuth.post('/auth/logout')
  }
}

export default AuthService
