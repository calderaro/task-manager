import React from 'react'
import actions from '../../actions/'
import style from './style.css'
import seo from './seo'
import Layout from '../../components/Layout/'
import TaskForm from '../../components/TaskForm/'
import Timer from '../../components/Timer/'
import TaskList from '../../components/TaskList/'
import timeFormat from '../../helpers/timeFormat'
import filterTasks from '../../helpers/filterTasks'

class Home extends React.Component {
  static seo = seo
  state = {interval: null}
  start = () => {
    const currentTask = filterTasks(this.props.tasks).find(e => e.status === 'active')
    if (!currentTask) return
    this.setState({interval: setInterval(this.props.tasksTick, 1000)})
  }
  pause = () => {
    clearInterval(this.state.interval)
    this.setState({interval: null})
  }
  stop = () => {
    const currentTask = filterTasks(this.props.tasks).find(e => e.status === 'active')
    if (!currentTask) return
    this.pause()
    this.props.taskSetDone(currentTask.id)
  }
  reset = () => {
    const currentTask = filterTasks(this.props.tasks).find(e => e.status === 'active')
    if (!currentTask) return
    this.pause()
    this.props.taskResetTime(currentTask.id)
  }
  componentWillReceiveProps = (next) => {
    const currentTask = filterTasks(this.props.tasks).find(e => e.status === 'active')
    const nextTask = next.tasks.list.find(e => e.status === 'active')
    if (!nextTask || !currentTask || nextTask.id !== currentTask.id) return this.pause()
  }
  render = () => {
    const {start, pause, stop, reset, setDone} = this
    const task = filterTasks(this.props.tasks).find(e => e.status === 'active')
    const time = task && task.time
    return Layout(this.props,
      <div className={style.home}>
        {this.props.general.modal === 'taskForm' ? <TaskForm {...this.props} /> : null}
        <Timer {...{time: timeFormat((time || 0) / 1000), start, pause, stop, reset, interval: this.state.interval}} />
        <TaskList {...{...this.props, setDone}} />
      </div>
    )
  }
}

export default actions(Home)
