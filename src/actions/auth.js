import {FBAuth} from '../helpers/services'
import {tasksReset} from './tasks'
import window from 'global/window'

export const authChange = data => ({type: 'authChange', data})
export const authAttempt = () => ({type: 'authAttempt'})
export const authSuccess = data => ({type: 'authSuccess', data})
export const authError = data => ({type: 'authError', data})

export const login = (e) => (dispatch, getState) => {
  e.preventDefault()
  const {process} = getState().auth
  if (process) return
  dispatch(authAttempt())
  FBAuth()
  .then(dispatch(authSuccess()))
  .catch((e) => {
    if (e.message === 'Network Error') return dispatch(authError({code: 'networkError'}))
    if (e.code) return dispatch(authError(e))
    dispatch(authError(e.data))
  })
}

export const setUser = user => (dispatch, getState) =>
  user.getIdToken()
  .then(token => dispatch({type: 'authSetUser', user: {email: user.email, token}}))

export const removeUser = () => ({type: 'authRemoveUser'})

export const logout = () => (dispatch, getState) => {
  window.firebase.auth().signOut()
  if (window.desub) window.desub()
  dispatch(removeUser())
  dispatch(tasksReset())
}
