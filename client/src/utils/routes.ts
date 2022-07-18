import { Registration, Login, Disk, Profile } from '../components'
import { AuthRoutes, PublicRoutes, IRoute } from '../models/routes'

export const authRoutes: IRoute[] = [
  {
    path: AuthRoutes.CLOUD_DISK_ROUTE,
    Component: Disk,
  },
  {
    path: AuthRoutes.PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: AuthRoutes.REST_ROUTE,
    Component: Disk,
  },
]

export const publicRoutes: IRoute[] = [
  {
    path: PublicRoutes.REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: PublicRoutes.LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: PublicRoutes.REST_ROUTE,
    Component: Login,
  },
]

