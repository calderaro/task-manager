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
  openInport = () => this.refs.import.click()
  render = () => {
    const {start, pause, stop, reset, setDone} = this
    const task = filterTasks(this.props.tasks).find(e => e.status === 'active')
    const time = task && task.time
    return Layout(this.props,
      <div className={style.home}>
        {this.props.general.modal === 'taskForm' ? <TaskForm {...this.props} /> : null}
        <Timer {...{time: timeFormat((time || 0) / 1000), start, pause, stop, reset, interval: this.state.interval}} />
        <TaskList {...{...this.props, setDone}} />
        <input type='file' ref='import' onChange={this.props.tasksImport} style={{display: 'none'}} />
        <button className={style.importBtn} onClick={this.openInport}>Importar</button>
        <div className={style.importHelp}>
          <h4>Ejemplo CSV:</h4>
          <p>Orden: id, duration, time, title, createdAt, updatedAt, deletedAt, finalizedAt, status</p>
          <ul>
            <li>id: identificador único.</li>
            <li>duration: la duración máxima de la tarea.</li>
            <li>time: el tiempo que tomó completar la tarea.</li>
            <li>title: texto descriptivo.</li>
            <li>createdAt: fecha de creación.</li>
            <li>updatedAt: fecha de actualización.</li>
            <li>deletedAt: fecha de eliminación.</li>
            <li>finalizedAt: fecha de finalización.</li>
            <li>status: estatus de la tarea active, done, deleted.</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default actions(Home)
