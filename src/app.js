import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import window from 'global/window'
import debounce from 'lodash/debounce'
import configureStore from './store/configureStore'
import Root from './containers/Root/'

injectTapEventPlugin()

if (process.env.NODE_ENV === 'development') console.log(process.env.api)

const store = configureStore(window.initialState)
const resize = debounce(() => store.dispatch({type: 'setDimensions', h: window.innerHeight, w: window.innerWidth}), 100)
window.addEventListener('resize', resize)
resize()

const renderApp = Component =>
  render(<AppContainer><Component store={store} /></AppContainer>, document.getElementById('root'))

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
