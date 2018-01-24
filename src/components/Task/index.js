import React from 'react'
import style from './style.css'

export default function Task (props) {
  const {timeUnit, dragging, draggingOver, statusFilter, durationFilter} = props.tasks
  const {id, title, duration, status} = props.task
  const durationFilters = {
    'all': () => true,
    'short': t => (t <= 30 * 60 * 1000),
    'medium': t => (t >= 30 * 60 * 1000 && t <= 60 * 60 * 1000),
    'large': t => (t >= 60 * 60 * 1000)
  }
  return (
    <div
      title='Arrastra las tareas para reordenar'
      className={status === statusFilter && durationFilters[durationFilter](duration) ? style.task : style.deletedTask}
      style={{
        background: dragging && dragging.id === id ? '#fafafa' : '#FFF',
        borderTop: draggingOver && draggingOver.id === id ? '1px solid #999' : ''
      }}>
      <div className={style.title}>
        {title}
      </div>
      <div className={style.duration}>
        {(timeUnit === 'mins' ? duration / 1000 / 60 : duration / 1000) + timeUnit}
      </div>
      <div className={style.buttons}>
        {status === 'active'
          ? <button
            title='Terminar Tarea'
            className={style.editBtn} onClick={() => props.taskSetDone(props.task.id)}>
            <i className='fa fa-check' />
          </button>
          : null
        }
        {status === 'active'
          ? <button
            title='Editar Tarea'
            className={style.editBtn} onClick={() => props.selectTask(props.task)}>
            <i className='fa fa-edit' />
          </button>
          : null
        }
        <button
          title='Eliminar Tarea'
          className={style.deleteBtn} onClick={() => props.deleteTask(props.task)}>
          <i className='fa fa-times' />
        </button>
      </div>
    </div>
  )
}
