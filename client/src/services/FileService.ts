import $api from './http'
import { AxiosResponse } from 'axios'
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from '../store/actions/upload'
import { IFile } from '../models/IFile'

class FileService {
  static async getFiles(dirId: string, sort: string): Promise<AxiosResponse<IFile[]>> {
    const dirIdQuery = dirId ? `parent=${dirId}&` : ''
    const sortQuery = sort ? `sort=${sort}` : ''
    const url = `/files?${dirIdQuery}${sortQuery}`

    return $api.get<IFile[]>(url)
  }

  static async createDir(dirId: string, name: string): Promise<AxiosResponse<IFile>> {
    return $api.post<IFile>('/files', { name, parent: dirId, type: 'dir' })
  }

  static async uploadFile(file: any, dirId: any, dispatch: any) {
    const formData = new FormData()

    formData.append('file', file)

    if (dirId) {
      formData.append('parent', dirId)
    }

    const uploadFile = { name: file.name, progress: 0, id: Date.now() }

    dispatch(showUploader())
    dispatch(addUploadFile(uploadFile))

    return $api.post(`files/upload`, formData, {
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

  static async downloadFile(file: any) {
    const response = await $api.get(`/files/download?id=${file._id}`, {
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

  static async deleteFile(id: any): Promise<AxiosResponse<any>> {
    const url = `/files?id=${id}`

    return $api.delete<any>(url)
  }

  static async searchFiles(search: any): Promise<AxiosResponse<any>> {
    const url = `/files/search?search=${search}`

    return $api.get<any>(url)
  }
}

export default FileService
