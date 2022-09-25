import React, { useState } from 'react'

import { IUser } from '../shared/models/user'
import Alert from '../shared/helpers/Alert'
import useLogin from '../shared/api/user/login'

const Login: React.FC = () => {
  const { mutate, errors, isLoading } = useLogin()

  const [email, setEmail] = useState<IUser['email']>('')
  const [password, setPassword] = useState<IUser['password']>('')

  const loginClickHandler = () => {
    mutate({ email, password })
  }

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value)
  }

  if (isLoading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

  return (
    <div className='authorization'>
      <div className='authorization__header'>Авторизация</div>

      {errors.map((err) => (
        // @ts-ignore: Unreachable code error
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
