import { combineReducers } from 'redux'
import general from './general'
import auth from './auth'
import reproductor from './reproductor'

const rootReducer = combineReducers({
  general,
  auth,
  reproductor
})

export default rootReducer
