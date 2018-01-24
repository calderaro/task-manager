import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import window from 'global/window'
import debounce from 'lodash/debounce'
import configureStore from './store/configureStore'
import Root from './containers/Root/'
import {setUser, removeUser} from './actions/auth'
import {tasksLoad, tasksReset} from './actions/tasks'
import uniqBy from 'lodash/uniqBy'

injectTapEventPlugin()

if (process.env.NODE_ENV === 'development') console.log(process.env.api)

const firebase = window.firebase
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
  if (user) {
    store.dispatch(setUser(user))
    var userId = firebase.auth().currentUser.uid
    firebase.database().ref('/items/' + userId).once('value').then((snapshot) => {
      const list = uniqBy([...(snapshot.val() || []), ...store.getState().tasks.list], 'id')
      store.dispatch(tasksLoad(list))
    })
    store.subscribe(debounce(() => {
      firebase.database().ref('items/' + userId)
      .set(store.getState().tasks.list.filter(t => t.status !== 'deleted'))
    }, 1000, {'leading': true, 'trailing': false}))
  } else {
    store.dispatch(removeUser())
    store.dispatch(tasksReset())
  }

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
