import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { checkAuth } from '../store/actions/user'
import { setLoading } from '../store/reducers/user'
import { authRoutes, publicRoutes } from '../utils/routes'

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector((state) => state.user.isAuth)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      dispatch(checkAuth())
    } else {
      dispatch(setLoading(false))
    }
  }, [])

  return (
    <Routes>
      {isAuth
        ? authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))
        : publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
    </Routes>
  )
}

export default AppRouter
