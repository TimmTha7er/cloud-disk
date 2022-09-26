import React, { useState } from 'react'

import Alert from '../shared/helpers/Alert'
import { IUser } from '../shared/models/user'
import useRegistration from '../shared/api/user/registration'
import { IError } from '../shared/models/error'

const Registration: React.FC = () => {
  const { mutate, errors, isLoading } = useRegistration()

  const [email, setEmail] = useState<IUser['email']>('')
  const [password, setPassword] = useState<IUser['password']>('')

  const registrationClickHandler = () => {
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
      <div className='authorization__header'>Регистрация</div>

      {errors.map((error: IError, idx) => (
        <Alert
          key={idx}
          className='sign-in__message'
          type='danger'
          msg={error?.msg}
        />
      ))}

      <input
        value={email}
        onChange={emailChangeHandler}
        type='email'
        placeholder='Введите email...'
      />
      <input
        value={password}
        onChange={passwordChangeHandler}
        type='password'
        placeholder='Введите пароль...'
      />
      <button
        className='authorization__btn btn'
        onClick={registrationClickHandler}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}

export default Registration
