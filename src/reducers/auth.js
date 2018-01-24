const initialState = {
  step: 0,
  process: null,
  err: null,
  user: {email: null, token: null}
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case 'authAttempt':
      return {...state, process: true, err: null}
    case 'authSuccess':
      return {...state, process: false, err: null}
    case 'authError':
      return {
        ...state,
        process: null,
        err: action.data
      }
    case 'authSetUser':
      return {...state, user: action.user}
    case 'authRemoveUser':
      return initialState
    default:
      return state
  }
}
