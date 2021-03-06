import axiosAuth from '../utils/axiosAuth'
import { AxiosResponse } from 'axios'
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from '../store/actions/upload'
import { IFile } from '../models/file'
import { Dispatch } from 'redux'

class FileService {
  static async getFiles(dirId: string | null, sort?: string): Promise<AxiosResponse<IFile[]>> {
    const dirIdQuery = dirId ? `parent=${dirId}&` : ''
    const sortQuery = sort ? `sort=${sort}` : ''
    const url = `/files?${dirIdQuery}${sortQuery}`

    return axiosAuth.get<IFile[]>(url)
  }

  static async createDir(dirId: string | null, name: string): Promise<AxiosResponse<IFile>> {
    return axiosAuth.post<IFile>('/files', { name, parent: dirId, type: 'dir' })
  }

  static async uploadFile(file: File, dirId: string | null, dispatch: Dispatch): Promise<AxiosResponse<IFile>> {
    const formData = new FormData()

    formData.append('file', file)

    if (dirId) {
      formData.append('parent', dirId)
    }

    const uploadFile = { name: file.name, progress: 0, id: Date.now() }

    dispatch(showUploader())
    dispatch(addUploadFile(uploadFile))

    return axiosAuth.post(`files/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
          progressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          )

        if (totalLength) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / totalLength
          )

          uploadFile.progress = progress
          dispatch(changeUploadFile(uploadFile))
        }
      },
    })
  }

  static async downloadFile(file: IFile) {
    const response = await axiosAuth.get(`/files/download?id=${file.id}`, {
      responseType: 'blob',
    })

    if (response.status === 200) {
      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  static async deleteFile(id: string): Promise<AxiosResponse<{ message: string }>> {
    const url = `/files?id=${id}`

    return axiosAuth.delete<{ message: string }>(url)
  }

  static async searchFiles(search: string): Promise<AxiosResponse<IFile[]>> {
    const url = `/files/search?search=${search}`

    return axiosAuth.get<IFile[]>(url)
  }
}

export default FileService
