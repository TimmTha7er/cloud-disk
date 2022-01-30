import React from 'react'
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='navbar__logo' src={Logo} alt='' />
      <div className='navbar__header'>MERN CLOUD</div>
      <div className='navbar__login'>
        <NavLink to='/login'>Войти</NavLink>
      </div>
      <div className='navbar__registration'>
        <NavLink to='/registration'>Регистрация</NavLink>
      </div>
    </div>
  )
}

export default Navbar
