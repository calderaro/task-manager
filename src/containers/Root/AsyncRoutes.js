import asyncComponent from '../../helpers/asyncComponent'

export const Home = asyncComponent('Home', () => import('../Home/'))
export const Graph = asyncComponent('Graph', () => import('../Graph/'))
