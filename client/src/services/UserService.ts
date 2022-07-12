import { AxiosResponse } from 'axios'
import $api from './http'
import { IUser } from '../models/IUser'

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }

  static async uploadAvatar(file: any): Promise<AxiosResponse<IUser>> {
    const formData = new FormData()
    formData.append('file', file)

    return $api.post<IUser>(`/files/avatar`, formData)
  }

  static async deleteAvatar(): Promise<AxiosResponse<IUser>> {
    return $api.delete<IUser>(`/files/avatar`)
  }
}
