import { IUser } from './IUser'

export interface AuthResponse extends IUser {
  accessToken: string
  refreshToken: string
}