import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as general from './general'
import * as auth from './auth'

const actions = {
  ...general,
  ...auth
}

const con = Component => connect(state => state, dispatch => bindActionCreators(actions, dispatch))(Component)

export default con
