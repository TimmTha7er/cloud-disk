import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../../store/reducers/user'
import UserService from '../../services/UserService'

const useDeleteAvatar = () => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { mutate, isLoading } = useMutation(() => UserService.deleteAvatar(), {
    onSuccess: (response) => {
      dispatch(setUser(response.data))
    },
    onError: (error) => {
      setErrors((error as AxiosError)?.response?.data?.errors)
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    },
  })

  return { mutate, errors, isLoading }
}

export default useDeleteAvatar
