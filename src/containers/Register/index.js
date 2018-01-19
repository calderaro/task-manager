import React from 'react'
import Layout from '../../components/Layout/'
import Register from '../../components/Register/'
import actions from '../../actions/'
import style from './style.css'

class RegisterContainer extends React.Component {
  render = () => Layout(this.props,
    <div className={style.loginContainer}>
      <Register {...this.props} />
    </div>
  )
}

export default actions(RegisterContainer)
