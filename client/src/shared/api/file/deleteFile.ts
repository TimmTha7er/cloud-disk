import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import FileService from '../../../services/FileService'
import { IFile } from '../../models/file'

interface IMutationFnProps {
  fileId: IFile['id']
}

const useDeleteFile = () => {
  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { mutate, isLoading } = useMutation(
    ({ fileId }: IMutationFnProps) => FileService.deleteFile(fileId),
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

  return { mutate, errors, isLoading }
}

export default useDeleteFile
