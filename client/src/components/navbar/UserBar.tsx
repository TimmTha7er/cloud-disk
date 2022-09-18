import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logout } from '../../store/reducers/user'
import { setDefault } from '../../store/reducers/file'
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../config'

const UserBar = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser)
  const dispatch = useAppDispatch()

  const avatar = currentUser?.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(setDefault())
  }

  return (
    <div className='navbar__col'>
      {!currentUser && (
        <>
          <div className='navbar__login'>
            <NavLink to='/login'>Войти</NavLink>
          </div>
          <div className='navbar__registration'>
            <NavLink to='/registration'>Регистрация</NavLink>
          </div>
        </>
      )}
      {currentUser && (
        <>
          <div className='navbar__login' onClick={logoutHandler}>
            Выход
          </div>
          <NavLink to='/profile'>
            <img className='navbar__avatar' src={avatar} alt='' />
          </NavLink>
        </>
      )}
    </div>
  )
}

export default UserBar
