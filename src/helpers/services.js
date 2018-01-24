import window from 'global/window'

const firebase = window.firebase

export const FBAuth = () =>
  firebase
  ? firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(e => firebase.auth().currentUser)
  : null
