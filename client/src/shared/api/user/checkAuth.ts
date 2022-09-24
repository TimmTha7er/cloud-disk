import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../../store/reducers/user'
import AuthService from '../../services/AuthService'

const useCheckAuth = () => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<AxiosError[]>([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      refetch()
    }
  }, [])

  const { refetch, isLoading: loading } = useQuery(
    ['check auth'],
    () => AuthService.checkAuth(),
    {
      onSuccess: (response) => {
        dispatch(setUser(response.data))
        localStorage.setItem('token', response.data.accessToken)
      },
      onError: (error) => {
        setErrors((error as AxiosError)?.response?.data?.errors)
        console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      },
      enabled: false,
    }
  )
  const isLoading = loading && token

  return { errors, isLoading }
}

export default useCheckAuth
