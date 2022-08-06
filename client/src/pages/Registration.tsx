import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setError } from '../store/reducers/user'
import { registration } from '../store/actions/user'
import Alert from '../components/helpers/Alert'

const Registration: React.FC = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.user.error)
  const loading = useAppSelector((state) => state.user.loading)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    dispatch(setError([]))
  }, [])

  const registrationClickHandler = () => {
    dispatch(registration(email, password))
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
      <div className='authorization__header'>Регистрация</div>

      {error.map((err) => (
        <Alert className='sign-in__message' type='danger' msg={err?.msg} />
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
