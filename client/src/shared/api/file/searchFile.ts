import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import FileService from '../../services/FileService'

const useSearchFile = ({ search }: { search: string }) => {
  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { refetch, isLoading } = useQuery(
    ['search files', search],
    () => FileService.searchFiles(search),
    {
      onSuccess: (response) => {
        queryClient.setQueriesData(['files'], response)
      },
      onError: (error) => {
        setErrors((error as AxiosError)?.response?.data?.errors)
        console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      },
      enabled: false,
    }
  )

  return { refetch, errors, isLoading }
}

export default useSearchFile
