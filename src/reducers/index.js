import { combineReducers } from 'redux'
import general from './general'
import auth from './auth'
import tasks from './tasks'

const rootReducer = combineReducers({
  general,
  auth,
  tasks
})

export default rootReducer
