
export const tasksChange = data => ({type: 'tasksChange', data})
export const tasksSelect = data => ({type: 'tasksSelect', data})
export const tasksInput = e => {
  const name = e.target.id
  const value = e.target.value
  return tasksChange({[name]: value})
}

export const tasksAdd = () => ({type: 'tasksAdd'})
export const tasksUpdate = () => ({type: 'tasksUpdate'})
export const tasksDelete = id => ({type: 'tasksDelete'})
