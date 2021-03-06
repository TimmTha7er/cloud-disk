export interface IUser {
  email: string
  id: string
  isActivated: boolean
  diskSpace: number
  usedSpace: number
  avatar: string
}

export interface AuthResponse extends IUser {
  accessToken: string
  refreshToken: string
}