import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import avatarLogo from '../../assets/img/avatar.svg'
import { logout } from '../../store/actions/user'
import { API_URL } from '../../config'
import { setDefault } from '../../store/actions/file'
import { RootState } from '../../store'

const UserBar = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const dispatch = useDispatch()

  const avatar = currentUser?.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(setDefault())
  }

  return (
    <div className='navbar__col'>
      {!isAuth && (
        <>
          <div className='navbar__login'>
            <NavLink to='/login'>Войти</NavLink>
          </div>
          <div className='navbar__registration'>
            <NavLink to='/registration'>Регистрация</NavLink>
          </div>
        </>
      )}
      {isAuth && (
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
