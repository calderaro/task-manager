import * as Routes from './SyncRoutes'

const routes = [
  {path: '/', exact: true, component: Routes.Home},
  {path: '/registro', exact: true, component: Routes.Register},
  {path: '/login', exact: true, component: Routes.Login},
  {path: '/conocenos', exact: true, component: Routes.About},
  {path: '/audios', exact: true, component: Routes.Audios},
  {path: '/videos', exact: true, component: Routes.Videos},
  {path: '/obras', exact: true, component: Routes.Works},
  {path: '/exposiciones', exact: true, component: Routes.Exhibitions}
]

export default routes
