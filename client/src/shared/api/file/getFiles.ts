import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useAppSelector } from '../../hooks/redux'
import FileService from '../../services/FileService'

const useGetFiles = ({ sort }: { sort?: string }) => {
  const dirId = useAppSelector((state) => state.files.currentDir)
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { refetch, isLoading, data } = useQuery(
    ['files', dirId, sort],
    () => FileService.getFiles(dirId, sort),
    {
      onSuccess: () => {},
      onError: (error) => {
        setErrors((error as AxiosError)?.response?.data?.errors)
        console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      },
      // enabled: false,
    }
  )

  return { data, refetch, errors, isLoading }
}

export default useGetFiles
