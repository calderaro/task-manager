import asyncComponent from '../../helpers/asyncComponent'

export const Register = asyncComponent('Register', () => import('../Register/'))
export const Login = asyncComponent('Login', () => import('../Login/'))
export const Home = asyncComponent('Home', () => import('../Home/'))
export const Graph = asyncComponent('Graph', () => import('../Graph/'))
