import shortid from 'shortid'

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
export const tasksAdd = () => ({type: 'tasksAdd', id: shortid.generate()})
export const tasksUpdate = () => ({type: 'tasksUpdate'})
export const tasksDelete = data => ({type: 'tasksDelete', data})
export const tasksSoftDelete = data => ({type: 'tasksSoftDelete', data})
export const tasksSelectDuration = data => ({type: 'tasksSelectDuration', data})
export const tasksSelectTimeUnit = data => ({type: 'tasksSelectTimeUnit', data})
