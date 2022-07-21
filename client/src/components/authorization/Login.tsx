import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Input } from '../../components'
import { RootState } from '../../store'
import { login } from "../../store/actions/user"
import Alert from './Alert'

const Login: React.FC = () => {
  const error = useSelector((state: RootState) => state.user.error)
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
	const dispatch = useDispatch()

  return (
    <div className='authorization'>
      <div className='authorization__header'>Авторизация</div>

      {error.map((err: any) => 
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
        onClick={() => dispatch(login(email, password))}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
