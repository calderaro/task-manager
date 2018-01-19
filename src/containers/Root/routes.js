import * as Routes from './SyncRoutes'

const routes = [
  {path: '/', exact: true, component: Routes.Home},
  {path: '/registro', exact: true, component: Routes.Register},
  {path: '/login', exact: true, component: Routes.Login}
]

export default routes
