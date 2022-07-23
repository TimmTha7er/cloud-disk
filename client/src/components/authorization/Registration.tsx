import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Input } from '../../components'
import { RootState } from '../../store'
import { registration, setError } from '../../store/actions/user'
import Alert from './Alert'

const Registration: React.FC = () => {
  const dispatch = useDispatch()
  const error = useSelector((state: RootState) => state.user.error)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    dispatch(setError([]))
  }, [])

  const registrationClickHandler = () => {
    dispatch(registration(email, password))
  }

  return (
    <div className='authorization'>
      <div className='authorization__header'>Регистрация</div>

      {error.map((err) => 
        <Alert className='sign-in__message' type='danger' msg={err?.msg} />
      )}

      <Input
        value={email}
        setValue={setEmail}
        type='email'
        placeholder='Введите email...'
      />
      <Input
        value={password}
        setValue={setPassword}
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
