import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Input } from '../../components'
import { IUser } from '../../models/user'
import { RootState } from '../../store'
import { login, setError } from "../../store/actions/user"
import Alert from './Alert'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const error = useSelector((state: RootState) => state.user.error)
  
  const [email, setEmail] = useState<IUser['email']>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    dispatch(setError([]))
  }, [])

  const loginClickHandler = () => {
    dispatch(login(email, password))
  }

  return (
    <div className='authorization'>
      <div className='authorization__header'>Авторизация</div>

      {error.map((err) => 
        <Alert className='sign-in__message' type='danger' msg={err?.msg} />
      )}

      <Input
        value={email}
        setValue={setEmail}
        type='text'
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
        onClick={loginClickHandler}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
