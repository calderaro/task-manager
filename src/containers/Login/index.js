import React from 'react'
import Layout from '../../components/Layout/'
import Login from '../../components/Login/'
import actions from '../../actions/'
import style from './style.css'

const LoginContainer = props => Layout(props,
  <div className={style.loginContainer}>
    <Login {...props} />
  </div>
)

export default actions(LoginContainer)
