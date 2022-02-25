import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './navbar/navbar'
import './app.css'
import Registration from './authorization/Registration'
import Login from './authorization/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from '../actions/user'
import Disk from './disk/Disk'
import Profile from './profile/Profile'

function App() {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar></Navbar>
        <div className='wrap'>
          {!isAuth ? (
            <Routes>
              <Route path='/registration' element={<Registration />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Login />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Disk />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route path='*' element={<Disk />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
