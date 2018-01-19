import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {StaticRouter, matchPath, Route, Switch} from 'react-router-dom'

function renderContainer (routes, rootReducer, html) {
  return function renderMounter (req, res, next) {
    res.render = function render (opt) {
      const store = applyMiddleware(thunk)(createStore)(rootReducer)
      const seo = routes.reduce((acc, route) => matchPath(req.url, route) && route.component && route.component({ssr: true}).seo
        ? [...acc, route.component({ssr: true}).seo]
        : acc, [])
      const promises = routes.reduce((acc, route) =>
        matchPath(req.url, route) && route.component && route.component({ssr: true}).initialAction
        ? [...acc, Promise.resolve(store.dispatch(route.component({ssr: true}).initialAction()))]
        : acc, [])

      Promise.all(promises).then(() => {
        const routerContext = {splitPoints: []}
        const root = (
          <Provider store={store}>
            <StaticRouter location={req.url} context={routerContext}>
              <Switch>
                {routes.map(route => (<Route {...route} />))}
              </Switch>
            </StaticRouter>
          </Provider>
        )

        if (routerContext.url) return res.redirect(301, routerContext.url)
        return res.status(200).send(html({root, initialState: store.getState(), routerContext, ...opt, head: seo.pop()}))
      })
      .catch(e => console.log('Promise error: ', e))
    }
    return next()
  }
}

export default renderContainer
