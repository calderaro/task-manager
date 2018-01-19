const initialState = {
  process: 'placeholder',
  modal: '',
  value: null,
  step: 0,
  h: 0,
  w: 0
}

export default function general (state = initialState, action) {
  switch (action.type) {
    case 'generalChante':
      return {...state, ...action.state}
    case 'setModal':
      return {...state, ...action.data}
    case 'closeAll':
      return {...state, modal: null, value: null, step: 0}
    case 'generalReset':
      return initialState
    case 'setDimensions':
      return {...state, h: action.h, w: action.w}
    case 'setReady':
      return {...state, process: null}
    default:
      return state
  }
}
