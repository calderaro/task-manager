import React from 'react'
import style from './style.css'
import Task from '../Task/'

export default function TaskList (props) {
  const {timeUnit, timeUnits, statusFilter, statusList, durationFilter, durationList, list} = props.tasks
  return (
    <div>
      <div className={style.taskList}>
        <div className={style.topBtns}>
          <button
            className={style.newTaskBtn}
            onClick={() => props.setModal('taskForm')}>
            Nueva Tarea
          </button>
          <select
            title='Filtrar por status'
            value={statusFilter}
            onChange={props.tasksSetStatusFilter}>
            {statusList.map((s, i) => <option value={s} key={i}>{s}</option>)}
          </select>
          <select
            title='Filtrar por timpo'
            value={durationFilter}
            onChange={props.tasksSetDurationFilter}>
            {durationList.map((s, i) => <option value={s} key={i}>{s}</option>)}
          </select>
          <select
            title='Cambiar unidad de tiempo'
            value={timeUnit}
            onChange={e => props.tasksSelectTimeUnit(e.target.value)}>
            {timeUnits.map((s, i) => <option value={s} key={i}>{s}</option>)}
          </select>
        </div>
        {!list.length
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
        {list.map((task, i) => (
          <div
            key={i}
            draggable
            onDragStart={e => props.dragTask(e, task)}
            onDragEnd={e => props.dragTask(e, null)}
            onDragOver={e => props.setDraggingOverTask(e, task)}
            onDrop={e => props.dropTask(e, task, i)}>
            <Task {...{...props, task, setDone: props.setDone}} />
          </div>
        ))}
      </div>
    </div>
  )
}
