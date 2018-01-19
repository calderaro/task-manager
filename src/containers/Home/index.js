import React from 'react'
import actions from '../../actions/'
import style from './style.css'
import seo from './seo'
import Layout from '../../components/Layout'
import Carousel from './Carousel'
import Expos from './Expos'
import ItemLine from '../../components/ItemLine/'
import data from './data'

class Home extends React.Component {
  static seo = seo
  state = {navOut: false}
  componentDidMount = () => setTimeout(() => this.setState({navOut: true}), 500)
  render = () => {
    return Layout({...this.props, navOut: this.state.navOut},
      <div className={style.home}>
        <Carousel />
        <div className={this.state.navOut ? style.content + ' ' + style.contentOut : style.content}>
          <Expos {...this.props} />
          <ItemLine title='Exposiciones' data={data} />
          <ItemLine title='Videos' data={data} />
          <ItemLine title='Audios' data={data} />
        </div>
      </div>
    )
  }
}

export default actions(Home)
