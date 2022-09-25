import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { authRoutes, publicRoutes } from '../shared/routes'
import useCheckAuth from '../shared/api/user/checkAuth'
import { useAppSelector } from '../shared/hooks/redux'
import Alert from '../shared/helpers/Alert'

const AppRouter: React.FC = () => {
  const { errors, isLoading } = useCheckAuth()
  const isAuth = useAppSelector((state) => state.user.currentUser)

  if (isLoading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

  return (
    <Routes>
      {errors.map((error) => (
        // @ts-ignore
        <Alert className='sign-in__message' type='danger' msg={error?.msg} />
      ))}

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
