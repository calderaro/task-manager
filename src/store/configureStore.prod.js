import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {loadState, saveState} from '../helpers/localStorage'
import throttle from 'lodash/throttle'
import pick from 'lodash/pick'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default function configureStore (h) {
  const initialState = {...loadState(), ...h}
  const store = createStoreWithMiddleware(rootReducer, initialState)
  store.subscribe(throttle(() => saveState({ date: new Date(), ...pick(store.getState(), ['user']) }), 1000))
  return store
}
