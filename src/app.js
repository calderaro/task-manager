import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import window from 'global/window'
import debounce from 'lodash/debounce'
import configureStore from './store/configureStore'
import Root from './containers/Root/'
import {relogin} from './actions/auth'

injectTapEventPlugin()

if (process.env.NODE_ENV === 'development') console.log(process.env.api)

const store = configureStore(window.initialState)
const resize = debounce(() => store.dispatch({type: 'setDimensions', h: window.innerHeight, w: window.innerWidth}), 100)
window.addEventListener('resize', resize)
resize()

firebase.initializeApp({
  apiKey: 'AIzaSyA_6SxcKpZonpOasCRhOH6DSyrY_Jbhj3Q',
  authDomain: 'taskmanager-d8810.firebaseapp.com',
  databaseURL: 'https://taskmanager-d8810.firebaseio.com',
  projectId: 'taskmanager-d8810',
  storageBucket: 'taskmanager-d8810.appspot.com',
  messagingSenderId: '726775944485'
})

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
