import asyncComponent from '../../helpers/asyncComponent'

export const Register = asyncComponent('Register', () => import('../Register/'))
export const Login = asyncComponent('Login', () => import('../Login/'))
export const Home = asyncComponent('Home', () => import('../Home/'))
