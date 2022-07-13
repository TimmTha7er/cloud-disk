export enum AuthRoutes {
	CLOUD_DISK_ROUTE = '/',
	PROFILE_ROUTE = '/profile',
	REST_ROUTE = '*',
}

export enum PublicRoutes {
	REGISTRATION_ROUTE = '/registration',
	LOGIN_ROUTE = '/login',
	REST_ROUTE = '*',
}

export interface IRoute {
  path: AuthRoutes | PublicRoutes
  Component: React.FC
}