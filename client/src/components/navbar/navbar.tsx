import React from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../hooks/redux'
import Logo from '../../assets/img/navbar-logo.svg'
import { Search, UserBar } from '../../components'

const Navbar = () => {
  const isAuth = useAppSelector((state) => state.user.currentUser)

  return (
    <div className='navbar'>
      <div className='navbar__col'>
        <Link to='/' className='navbar__link link'>
          <img className='navbar__logo' src={Logo} alt='' />
          <div className='navbar__header'>CLOUD</div>
        </Link>
        {isAuth && <Search />}
      </div>
      <UserBar />
    </div>
  )
}

export default Navbar
