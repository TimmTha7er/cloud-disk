import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../../store/reducers/user'
import { IUser } from '../../models/user'
import AuthService from '../../services/AuthService'

interface IMutationFnProps {
  email: IUser['email']
  password: IUser['password']
}

const useRegistration = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const { mutate, isLoading } = useMutation(
    ({ email, password }: IMutationFnProps) =>
      AuthService.registration(email, password),
    {
      onSuccess: (response) => {
        dispatch(setUser(response.data))
        localStorage.setItem('token', response.data.accessToken)

        navigate('/')
      },
      onError: (error) => {
        setErrors((error as AxiosError)?.response?.data?.errors)
        console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      },
    }
  )

  return { mutate, errors, isLoading }
}

export default useRegistration
