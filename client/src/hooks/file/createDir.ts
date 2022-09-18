import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import FileService from '../../services/FileService'
import { IFile } from '../../models/file'

interface IMutationFnProps {
  dirId: IFile['id'] | null
  name: IFile['name']
}

const useCreateDir = () => {
  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { mutate, isLoading } = useMutation(
    ({ dirId, name }: IMutationFnProps) => FileService.createDir(dirId, name),
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

export default useCreateDir
