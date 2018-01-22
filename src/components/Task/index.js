import React from 'react'
import style from './style.css'

export default function Task (props) {
  const {timeUnit, dragging, draggingOver} = props.tasks
  const {id, duration, status} = props.task
  console.log(props.task);
  return (
    <div
      className={status === 'deleted' ? style.deletedTask : style.task}
      style={{
        background: dragging && dragging.id === id ? '#fafafa' : '#FFF',
        borderTop: draggingOver && draggingOver.id === id ? '1px solid #999' : ''
      }}>
      <div className={style.title}>
        {props.task.title}
      </div>
      <div className={style.duration}>
        {(timeUnit === 'mins' ? duration / 1000 / 60 : duration / 1000) + timeUnit}
      </div>
      <div
        title='Editar Tarea'
        className={style.buttons}>
        <button className={style.editBtn} onClick={() => props.selectTask(props.task)}>
          <i className='fa fa-edit' />
        </button>
        <button
          title='Eliminar Tarea'
          className={style.deleteBtn} onClick={() => props.tasksSoftDelete(props.task)}>
          <i className='fa fa-times' />
        </button>
      </div>
    </div>
  )
}
