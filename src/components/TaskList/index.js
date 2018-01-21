import React from 'react'
import style from './style.css'
import Task from '../Task/'

export default function TaskList (props) {
  return (
    <div>
      <div className={style.taskList}>
        <button
          className={style.newTaskBtn}
          onClick={() => props.setModal('taskForm')}>Nueva Tarea</button>
        {!props.tasks.list.length
          ? <div className={style.emptyEl}>
            <i className='fa fa-inbox' />
            <div>Aún no tienes Tareas</div>
          </div>
          : <div className={style.taskListHeader}>
            <div>Descripción</div>
            <div>Tiempo</div>
            <div />
          </div>
        }
        {props.tasks.list.map((task, i) => (
          <div
            draggable
            onDragStart={e => props.dragTask(e, task)}
            onDragEnd={e => props.dragTask(e, null)}
            onDragOver={e => props.setDraggingOverTask(e, task)}
            onDrop={e => props.dropTask(e, task, i)}>
            <Task key={i} {...{...props, task}} />
          </div>
        ))}
      </div>
    </div>
  )
}
