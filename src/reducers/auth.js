const initialState = {
  step: 0,
  process: null,
  err: null,
  data: {
    email: '',
    password: '',
    repassword: ''
  }
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case 'authChange':
      return {...state, err: null, data: {...state.data, ...action.data}}
    case 'authReset':
      return initialState
    case 'authAttempt':
      return {...state, process: true, err: null}
    case 'authSuccess':
      return initialState
    case 'recoverCheckTokenAttempt':
      return {...state, process: 'recoverCheck', err: null}
    case 'recoverCheckTokenSuccess':
      return {initialState, data: {...state.data, ...action.data}}
    case 'recoverAttempt':
      return {...state, process: 'recover', err: null}
    case 'recoverSuccess':
      return {...initialState, step: 1}
    case 'authError':
      return {
        ...state,
        process: null,
        err: action.data
      }
    default:
      return state
  }
}
