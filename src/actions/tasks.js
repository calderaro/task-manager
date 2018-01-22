import shortid from 'shortid'
import {setModal} from './general'

export const tasksChange = data => ({type: 'tasksChange', data})
export const tasksInput = e => (dispatch, getState) => {
  const {timeUnit} = getState().tasks
  const maxTime = 120 * 60 * 1000
  const name = e.target.id
  const value = e.target.value

  if (name === 'duration') {
    const duration =
      timeUnit === 'mins'
        ? e.target.value * 1000 * 60
        : e.target.value * 1000
    return dispatch(tasksChange({[name]: duration >= maxTime ? maxTime : duration}))
  }
  return dispatch(tasksChange({[name]: value}))
}

export const tasksSelectTask = data => ({type: 'tasksSelectTask', data})
export const tasksAdd = (id, createdAt) => ({type: 'tasksAdd', id, createdAt})
export const tasksUpdate = updatedAt => ({type: 'tasksUpdate', updatedAt})
export const tasksDelete = data => ({type: 'tasksDelete', data})
export const tasksSoftDelete = (task, deletedAt) => ({type: 'tasksSoftDelete', task, deletedAt})
export const tasksSelectDuration = data => ({type: 'tasksSelectDuration', data})
export const tasksSelectTimeUnit = data => ({type: 'tasksSelectTimeUnit', data})

export const newTask = () => (dispatch, getState) => {
  // validaciones aqui
  dispatch(tasksAdd(shortid.generate(), new Date()))
  dispatch(setModal(null))
}

export const updateTask = () => (dispatch, getState) => {
  // validaciones aqui
  dispatch(tasksUpdate(new Date()))
  dispatch(setModal(null))
}

export const selectTask = task => (dispatch, getState) => {
  dispatch(tasksSelectTask(task))
  dispatch(setModal('taskForm'))
}

export const dragTask = (e, task) => (dispatch, getState) => {
  const {dragging} = getState().tasks
  if (dragging && task && task.id === dragging.id) return
  dispatch({type: 'tasksSetDrag', task})
}
export const setDraggingOverTask = (e, task) => (dispatch, getState) => {
  e.preventDefault()
  const {draggingOver} = getState().tasks
  if (draggingOver && task && task.id === draggingOver.id) return
  dispatch({type: 'setDraggingOverTask', task})
}

export const dropTask = (e, task, index) => (dispatch, getState) => {
  e.preventDefault()
  const {dragging, draggingOver} = getState().tasks
  if (dragging && draggingOver && dragging.id === draggingOver.id) return
  dispatch({type: 'tasksReorder', task: dragging, index})
}
