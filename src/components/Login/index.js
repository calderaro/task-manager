import React from 'react'
import get from 'lodash/fp/get'
import {Link} from 'react-router-dom'
import {Input} from 'react-one-form'
import Error from '../Error/'
import style from './style.css'

const Login = props => {
  const {process, err} = props.auth
  const config = {store: props.auth, change: props.authInput, style}
  const state = get('location.state', props)
  return (
    <div className={style.login}>
      <h1>Login</h1>
      <form onKeyDown={e => e.key === 'Enter' ? props.login(state) : null}>
        <div><Input {...{...config, id: 'email', label: 'Email'}} /></div>
        <div><Input {...{...config, id: 'password', type: 'password', label: 'Contraseña'}} /></div>
        <Link to='/recover'>¿Olvidaste tu contraseña?</Link>
        <Error err={err} />
        <Link to={{pathname: '/registro', state}}>¿Eres nuevo usuario? <strong>Regístrate</strong></Link>
        <button type='button' onClick={() => props.login(state)}>
          {process ? <i className='fa fa-circle-o-notch fa-spin' /> : 'INGRESAR'}
        </button>
      </form>
    </div>
  )
}
export default Login
