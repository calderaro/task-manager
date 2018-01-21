import React from 'react'
import actions from '../../actions/'
import style from './style.css'
import seo from './seo'
import Layout from '../../components/Layout/'
import TaskForm from '../../components/TaskForm/'
import Timer from '../../components/Timer/'
import TaskList from '../../components/TaskList/'

class Home extends React.Component {
  static seo = seo
  render = () => {
    return Layout(this.props,
      <div className={style.home}>
        {this.props.general.modal === 'taskForm' ? <TaskForm {...this.props} /> : null}
        <Timer {...this.props} />
        <TaskList {...{...this.props, tasks: this.props.tasks}} />
      </div>
    )
  }
}

export default actions(Home)
