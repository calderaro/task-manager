import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import window from 'global/window'
import debounce from 'lodash/debounce'
import configureStore from './store/configureStore'
import Root from './containers/Root/'
import {relogin} from './actions/auth'
import {updateTime, setDuration, setStatus, next} from './actions/reproductor'

injectTapEventPlugin()

if (process.env.NODE_ENV === 'development') console.log(process.env.api)

const store = configureStore(window.initialState)
const resize = debounce(() => store.dispatch({type: 'setDimensions', h: window.innerHeight, w: window.innerWidth}), 100)
window.addEventListener('resize', resize)
resize()

firebase.initializeApp({
  apiKey: 'AIzaSyCy81fWIHP9jP1yB9gV7Keh2xYd_IDQjUI',
  authDomain: 'cargopi-nyx.firebaseapp.com',
  databaseURL: 'https://cargopi-nyx.firebaseio.com',
  projectId: 'cargopi-nyx',
  storageBucket: 'cargopi-nyx.appspot.com',
  messagingSenderId: '870128401777'
})

jwplayer.key = '3eeql0FiAbAhbeJ5RGLiZDqWdfmPscYDl+h0fYnoqhM='
window.audio = new Audio()
window.audio.addEventListener('timeupdate', e => store.dispatch(updateTime()))
window.audio.addEventListener('canplay', e => store.dispatch(setDuration()))
window.audio.addEventListener('play', e => store.dispatch(setStatus('playing')))
window.audio.addEventListener('pause', e => store.dispatch(setStatus('paused')))
window.audio.addEventListener('ended', e => store.dispatch(next()))

const renderApp = Component =>
  render(<AppContainer><Component store={store} /></AppContainer>, document.getElementById('root'))

window.firebase.auth().onAuthStateChanged(user => {
  if (user) store.dispatch(relogin(user.pa))
  if (process.env.NODE_ENV === 'production') {
    const routes = require('./containers/Root/SyncRoutes')
    const splitPoints = window.splitPoints || []

    Promise.all(splitPoints.map(chunk => routes[chunk].loadComponent()))
      .then(() => renderApp(Root))
  } else {
    renderApp(Root)
  }

  if (module.hot) {
    module.hot.accept('./containers/Root', () => renderApp(require('./containers/Root').default))
  }
})
