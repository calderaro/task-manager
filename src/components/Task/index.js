import React from 'react'
import style from './style.css'

export default function Task (props) {
  const {defaultDurations, timeUnits, timeUnit} = props.tasks
  const {duration, deleted} = props.task
  return (
    <div
      className={deleted ? style.deletedTask : style.task}>
      <div>
        {props.task.title}
      </div>
      <div>
        {(timeUnit === 'mins' ? duration / 1000 / 60 : duration / 1000) + timeUnit}
      </div>
      <button onClick={() => props.tasksSelectTask(props.task)}>Editar</button>
      <button onClick={() => props.tasksSoftDelete(props.task)}>Eliminar</button>
    </div>
  )
}
