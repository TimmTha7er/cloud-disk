import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setError } from '../store/reducers/user'
import { login } from '../store/actions/user'
import { IUser } from '../models/user'
import Alert from '../components/helpers/Alert'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const error = useAppSelector((state) => state.user.error)
  const loading = useAppSelector((state) => state.user.loading)

  const [email, setEmail] = useState<IUser['email']>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    dispatch(setError([]))
  }, [])

  const loginClickHandler = () => {
    dispatch(login(email, password))
    navigate('/')
  }

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value)
  }

  if (loading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

  return (
    <div className='authorization'>
      <div className='authorization__header'>Авторизация</div>

      {error.map((err) => (
        <Alert className='sign-in__message' type='danger' msg={err?.msg} />
      ))}

      <input
        value={email}
        onChange={emailChangeHandler}
        type='text'
        placeholder='Введите email...'
      />
      <input
        value={password}
        onChange={passwordChangeHandler}
        type='password'
        placeholder='Введите пароль...'
      />
      <button className='authorization__btn btn' onClick={loginClickHandler}>
        Войти
      </button>
    </div>
  )
}

export default Login
