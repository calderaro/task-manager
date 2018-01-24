import history from '../helpers/history'
import window from 'global/window'
import {setReady} from './general'
import {FBAuth} from '../helpers/services'

export const authChange = data => ({type: 'authChange', data})
export const authAttempt = () => ({type: 'authAttempt'})
export const authSuccess = data => ({type: 'authSuccess', data})
export const authError = data => ({type: 'authError', data})

export const login = (e) => (dispatch, getState) => {
  e.preventDefault()
  const {process, data} = getState().auth
  if (process) return
  dispatch(authAttempt())
  FBAuth()
  .then(res => {
    dispatch({type: 'SET_USER', user: res.data})
    dispatch(authSuccess())
    history.push('/')
  })
  .catch((e) => {
    if (e.message === 'Network Error') return dispatch(authError({code: 'networkError'}))
    if (e.code) return dispatch(authError(e))
    dispatch(authError(e.data))
  })
}
export const logout = () => (dispatch, getState) => {
  window.firebase.auth().signOut()
  dispatch({type: 'authLogout'})
  history.push('/login')
}
export const checkToken = () => (dispatch, getState) =>
  (!getState().user.token || !window.firebase.auth().currentUser)
  ? dispatch(logout())
  : dispatch(setReady())
