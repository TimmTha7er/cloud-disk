import React, { useState } from 'react'
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { showLoader } from '../../reducers/appReducer'
import { getFiles, searchFiles } from '../../actions/file'

const Navbar = () => {
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)

  const isAuth = useSelector((state) => state.user.isAuth)
  const currentDir = useSelector((state) => state.files.currentDir)
  const dispatch = useDispatch()

  const searchChangeHandler = (event) => {
    setSearchName(event.target.value)
    
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }

    dispatch(showLoader())

    if (event.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value))
          },
          500,
          event.target.value
        )
      )
    } else {
      dispatch(getFiles(currentDir))
    }
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
          <div className='navbar__login' onClick={() => dispatch(logout())}>
            Выход
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
