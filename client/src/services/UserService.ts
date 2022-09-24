import { AxiosResponse } from 'axios'
import axiosAuth from '../shared/api/interceptors/axiosAuth'
import { IUser } from '../shared/models/user'

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return axiosAuth.get<IUser[]>('/users')
  }

  static async uploadAvatar(file: File): Promise<AxiosResponse<IUser>> {
    const formData = new FormData()
    formData.append('file', file)

    return axiosAuth.post<IUser>(`/files/avatar`, formData)
  }

  static async deleteAvatar(): Promise<AxiosResponse<IUser>> {
    return axiosAuth.delete<IUser>(`/files/avatar`)
  }
}
