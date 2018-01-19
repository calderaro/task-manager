import React from 'react'
import get from 'lodash/fp/get'
import {Link} from 'react-router-dom'
import {Input} from 'react-one-form'
import Error from '../Error/'
import style from './style.css'

const Register = props => {
  const {process, err} = props.auth
  const config = {store: props.auth, change: props.authInput, style}
  const state = get('location.state', props)
  return (
    <div className={style.login}>
      <h1>Registro</h1>
      <form onKeyDown={e => e.key === 'Enter' ? props.register(state) : null}>
        <div className={style.inputsWrapper}>
          <Input {...{...config, id: 'firstName', label: 'Nombres'}} />
          <Input {...{...config, id: 'lastName', label: 'Apellidos'}} />
          <Input {...{...config, id: 'email', label: 'Email'}} />
          <Input {...{...config, id: 'company', label: 'Empresa'}} />
          <Input {...{...config, id: 'country', type: 'select', label: 'País'}} />
          <Input {...{...config, id: 'password', type: 'password', label: 'Contraseña'}} />
          <Input {...{...config, id: 'isMoralPerson', type: 'checkbox', label: 'Persona Moral'}} />
          <Input {...{
            ...config,
            id: 'acceptTerms',
            type: 'checkbox',
            label: 'Acepto los Términos y Condiciones.'}} />
        </div>
        <Error err={err} />
        <Link to={{pathname: '/login', state}}>¿Ya tienes cuenta? <strong>Inicia sessión</strong></Link>
        <button type='button' onClick={() => props.register(state)}>
          {process ? <i className='fa fa-circle-o-notch fa-spin' /> : 'Registrar'}
        </button>
      </form>
    </div>
  )
}

export default Register
