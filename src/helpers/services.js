import api from './api'
import FormData from './form'

const FBProvider = new firebase.auth.FacebookAuthProvider()

export const fregister = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(e => firebase.auth().currentUser.getIdToken())
export const flogin = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(e => firebase.auth().currentUser.getIdToken())
export const sregister = (data) =>
  api({url: 'register', method: 'post', body: FormData(data)})
export const slogin = (token) =>
  api({url: 'login', method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({token})})
export const rate = body =>
  api({
    durl: 'http://localhost:8002/api/rates',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })

export const FBAuth = () =>
  firebase.auth().signInWithPopup(FBProvider)
  .then(e => firebase.auth().currentUser.getIdToken())
