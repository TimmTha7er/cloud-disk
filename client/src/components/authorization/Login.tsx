import React, { useState } from 'react'
import { useDispatch } from "react-redux"

import { Input } from '../../components'
import { login } from "../../store/actions/user"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
	const dispatch = useDispatch()

  return (
    <div className='authorization'>
      <div className='authorization__header'>Авторизация</div>
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
