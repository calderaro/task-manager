import React from 'react'
import style from './style.css'

export default function TaskForm (props) {
  const {defaultDurations, timeUnits, timeUnit, data} = props.tasks
  const {id, duration, title} = data
  return (
    <div className={style.taskFormContainer} onClick={() => props.setModal(null)}>
      <div className={style.taskForm}onClick={e => e.stopPropagation()}>
        <div className={style.header}>
          <i className='fa fa-times' onClick={() => props.setModal(null)} />
        </div>
        <input
          id='title'
          type='text'
          className={style.title}
          onChange={props.tasksInput}
          placeholder='Describe tu tarea...'
          value={title} />
        <div className={style.durations}>
          <div>Asigna la cantidad de tiempo</div>
          <div>
            {defaultDurations.map((d, i) => (
              <button key={i} onClick={() => props.tasksSelectDuration(d)}>
                {d / 1000 / 60 + 'MINS'}
              </button>
            ))}
            <input
              id='duration'
              type='number'
              className={style.duration}
              onChange={props.tasksInput}
              value={timeUnit === 'mins' ? duration / 1000 / 60 : duration / 1000} />
            <select
              id='timeUnit'
              className={style.duration}
              onChange={e => props.tasksSelectTimeUnit(e.target.value)}>
              {timeUnits.map((u, i) => <option key={i}>{u}</option>)}
            </select>
          </div>
        </div>
        {id
          ? <button className={style.button} onClick={props.updateTask}>
            ACTUALIZAR
          </button>
          : <button className={style.button} onClick={props.newTask}>
            AGREGAR
          </button>
        }
      </div>
    </div>
  )
}
