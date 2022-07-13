import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from '../store/actions/user'
import { RootState } from '../store'
import { authRoutes, publicRoutes } from '../utils/routes'

const AppRouter: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      dispatch(checkAuth())
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
