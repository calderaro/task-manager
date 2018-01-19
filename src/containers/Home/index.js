import React from 'react'
import actions from '../../actions/'
import style from './style.css'
import seo from './seo'
import Layout from '../../components/Layout/'
import TaskForm from '../../components/TaskForm/'
import Task from '../../components/Task/'

class Home extends React.Component {
  static seo = seo
  render = () => {
    return Layout(this.props,
      <div className={style.home}>
        <TaskForm {...this.props} />
        <div>
          {this.props.tasks.list.map((task, i) => <Task key={i} {...{...this.props, task}} />)}
        </div>
      </div>
    )
  }
}

export default actions(Home)
