import history from '../helpers/history'
import window from 'global/window'
import {setReady} from './general'
import {sregister, slogin} from '../helpers/services'

export const authChange = data => ({type: 'authChange', data})
export const authAttempt = () => ({type: 'authAttempt'})
export const authSuccess = data => ({type: 'authSuccess', data})
export const authError = data => ({type: 'authError', data})

export const login = (e) => (dispatch, getState) => {
  e.preventDefault()
  const {process, data} = getState().auth
  if (process) return
  dispatch(authAttempt())
  firebase.auth().signInWithEmailAndPassword(data.email, data.password)
  .then((e) => firebase.auth().currentUser.getIdToken())
  .then(token => slogin(token))
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

export const sendPasswordResetEmail = () => (dispatch, getState) => {
  const {process, data} = getState().auth
  if (process) return
  dispatch(authAttempt())
  firebase.auth().sendPasswordResetEmail(data.email)
  .then(res => dispatch(authSuccess()))
  .catch((e) => {
    if (e.code === 'auth/user-not-found') return dispatch(register())
    if (e.code) return dispatch(authError(e))
    dispatch(authError(e.response.data))
  })
}
export const recoverCheckTokenAttempt = () => ({type: 'recoverCheckTokenAttempt'})
export const recoverCheckTokenSuccess = data => ({type: 'recoverCheckTokenSuccess', data})
export const verifyPasswordResetCode = (code) => (dispatch, getState) => {
  if (!code) return
  const {process} = getState().auth
  if (process) return
  dispatch(recoverCheckTokenAttempt())
  firebase.auth().verifyPasswordResetCode(code)
  .then(email => dispatch(recoverCheckTokenSuccess({email, code})))
  .catch(e => {
    if (e.message === 'Network Error') return dispatch(authError({code: 'networkError'}))
    if (e.code === 'auth/user-not-found') return dispatch(register())
    if (e.code) return dispatch(authError(e))
    dispatch(authError(e.response.data))
  })
}
export const recoverAttempt = () => ({type: 'recoverAttempt'})
export const recoverSuccess = data => ({type: 'recoverSuccess', data})
export const confirmPasswordReset = () => (dispatch, getState) => {
  const {process, data} = getState().auth
  if (process) return
  dispatch(recoverAttempt())
  firebase.auth().confirmPasswordReset(data.code, data.password)
  .then(email => {
    dispatch(recoverSuccess())
    history.push('/login')
  })
  .catch(e => {
    if (e.message === 'Network Error') return dispatch(authError({code: 'networkError'}))
    if (e.code === 'auth/user-not-found') return dispatch(register())
    if (e.code) return dispatch(authError(e))
    dispatch(authError(e.response.data))
  })
}
