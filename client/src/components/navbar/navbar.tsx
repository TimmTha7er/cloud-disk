import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '../../assets/img/navbar-logo.svg'
import { RootState } from '../../store'
import { Search, UserBar } from '../../components'

const Navbar = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const loading = useSelector((state: RootState) => state.user.loading)

  if (loading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

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
