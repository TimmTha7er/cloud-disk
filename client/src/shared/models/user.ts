export interface IUser {
  email: string
  password: string
  id: string
  isActivated: boolean
  diskSpace: number
  usedSpace: number
  avatar: string | null
}

export interface AuthResponse extends IUser {
  accessToken: string
  refreshToken: string
}