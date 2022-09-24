import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../../store/reducers/user'
import UserService from '../../../services/UserService'

interface IMutationFnProps {
  file: File
}

const useUploadAvatar = () => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { mutate, isLoading } = useMutation(
    ({ file }: IMutationFnProps) => UserService.uploadAvatar(file),
    {
      onSuccess: (response) => {
        dispatch(setUser(response.data))
      },
      onError: (error) => {
        setErrors((error as AxiosError)?.response?.data?.errors)
        console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      },
    }
  )

  return { mutate, errors, isLoading }
}

export default useUploadAvatar
