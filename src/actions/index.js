import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as general from './general'
import * as auth from './auth'
import * as tasks from './tasks'

const actions = {
  ...general,
  ...auth,
  ...tasks
}

const con = Component => connect(state => state, dispatch => bindActionCreators(actions, dispatch))(Component)

export default con
