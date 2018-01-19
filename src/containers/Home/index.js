import React from 'react'
import actions from '../../actions/'
import style from './style.css'
import seo from './seo'
import Layout from '../../components/Layout'

class Home extends React.Component {
  static seo = seo
  render = () => {
    return Layout({...this.props, navOut: this.state.navOut},
      <div className={style.home}>
        hello
      </div>
    )
  }
}

export default actions(Home)
