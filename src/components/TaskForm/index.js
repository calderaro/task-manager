import React from 'react'
import style from './style.css'

export default function TaskForm (props) {
  const {defaultDurations, timeUnits, timeUnit, data} = props.tasks
  const {id, duration, title} = data
  return (
    <div className={style.taskForm}>
      <input
        id='title'
        type='text'
        onChange={props.tasksInput}
        value={title} />
      {defaultDurations.map((d, i) => (
        <button key={i} onClick={() => props.tasksSelectDuration(d)}>
          {d / 1000 / 60 + 'mins'}
        </button>
      ))}
      <input
        id='duration'
        type='text'
        onChange={props.tasksInput}
        value={timeUnit === 'mins' ? duration / 1000 / 60 : duration / 1000} />
      <select
        id='timeUnit'
        onChange={e => props.tasksSelectTimeUnit(e.target.value)}>
        {timeUnits.map((u, i) => <option key={i}>{u}</option>)}
      </select>
      {id
        ? <button onClick={props.tasksUpdate}>
          Actualizar
        </button>
        : <button onClick={props.tasksAdd}>
          Agregar
        </button>
      }
    </div>
  )
}
