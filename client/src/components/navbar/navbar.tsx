import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import Logo from '../../assets/img/navbar-logo.svg'
import avatarLogo from '../../assets/img/avatar.svg'
import { logout } from '../../store/actions/user'
import { getFiles, searchFiles, setLoading } from '../../store/actions/file'
import { API_URL } from '../../config'
import { setDefault } from '../../store/actions/file'
import { RootState } from '../../store'

const Navbar = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<number>(0)

  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const loading = useSelector((state: RootState) => state.user.loading)
  const dispatch = useDispatch()

  const avatar = currentUser?.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    dispatch(setLoading(true))

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

  if (loading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

  return (
    <div className='navbar'>
      <div className="navbar__col">
        <Link to='/' className='navbar__link link'>
          <img className='navbar__logo' src={Logo} alt='' />
          <div className='navbar__header'>CLOUD</div>
        </Link>
        {isAuth && (
          <input
            value={searchName}
            onChange={searchChangeHandler}
            className='navbar__search'
            type='text'
            placeholder='Название файла...'
          />
        )}
      </div>
      <div className="navbar__col">
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
