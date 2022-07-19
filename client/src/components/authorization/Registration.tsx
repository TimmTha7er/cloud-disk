import React, { useState } from 'react'
import { useDispatch } from "react-redux"

import { Input } from '../../components'
import { registration } from '../../store/actions/user'

const Registration: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()

  return (
    <div className='authorization'>
      <div className='authorization__header'>Регистрация</div>
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
        onClick={() => dispatch(registration(email, password))}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}

export default Registration
