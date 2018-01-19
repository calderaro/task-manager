import asyncComponent from '../../helpers/asyncComponent'

export const Register = asyncComponent('Register', () => import('../Register/'))
export const Login = asyncComponent('Login', () => import('../Login/'))
export const About = asyncComponent('About', () => import('../About/'))
export const Home = asyncComponent('Home', () => import('../Home/'))
export const Audios = asyncComponent('Audios', () => import('../Audios/'))
export const Videos = asyncComponent('Videos', () => import('../Videos/'))
export const Works = asyncComponent('Works', () => import('../Works/'))
export const Exhibitions = asyncComponent('Exhibitions', () => import('../Exhibitions/'))
