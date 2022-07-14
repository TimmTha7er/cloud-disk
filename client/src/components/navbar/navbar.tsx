import React, { useState } from 'react'
import Logo from '../../assets/img/navbar-logo.svg'
import avatarLogo from '../../assets/img/avatar.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/user'
import { showLoader } from '../../store/actions/app'
import { getFiles, searchFiles } from '../../store/actions/file'
import { API_URL } from '../../config'
import { setDefault } from '../../store/actions/file'
import { RootState } from '../../store'

const Navbar = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<number>(0)

  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const dispatch = useDispatch()

  const avatar = currentUser?.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    dispatch(showLoader())

    if (event.target.value !== '') {
      const timerId: ReturnType<typeof setTimeout> = setTimeout(
        (value) => {
          dispatch(searchFiles(value))
        },
        500,
        event.target.value
      )

      setSearchTimeout(Number(timerId))
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(setDefault())
  }

  return (
    <div className='navbar'>
      <div className='container'>
        <img className='navbar__logo' src={Logo} alt='' />
        <div className='navbar__header'>MERN CLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className='navbar__search'
            type='text'
            placeholder='Название файла...'
          />
        )}
        {!isAuth && (
          <div className='navbar__login'>
            <NavLink to='/login'>Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className='navbar__registration'>
            <NavLink to='/registration'>Регистрация</NavLink>
          </div>
        )}
        {isAuth && (
          <div className='navbar__login' onClick={logoutHandler}>
            Выход
          </div>
        )}

        {isAuth && (
          <NavLink to='/profile'>
            <img className='navbar__avatar' src={avatar} alt='' />
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Navbar
