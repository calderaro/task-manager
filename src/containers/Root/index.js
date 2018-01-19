import React from 'react'
import {Provider} from 'react-redux'
import history from '../../helpers/history'
import {Router, Route, Switch} from 'react-router-dom'
import routes from './routes'

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (<Route key={i} {...route} />))}
      </Switch>
    </Router>
  </Provider>
)

export default Root
