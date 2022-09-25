import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useAppDispatch } from '../../hooks/redux'
import FileService from '../../services/FileService'
import { IFile } from '../../models/file'

interface IMutationFnProps {
  file: File
  dirId: IFile['id'] | null
}

const useUploadFile = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { isLoading, mutateAsync } = useMutation(
    ({ file, dirId }: IMutationFnProps) =>
      FileService.uploadFile(file, dirId, dispatch),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['files'])
      },
      onError: (error) => {
        setErrors((error as AxiosError)?.response?.data?.errors)
        console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      },
    }
  )

  return { uploadFile: mutateAsync, errors, isLoading }
}

export default useUploadFile
