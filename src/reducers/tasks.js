const initialState = {
  timeUnits: ['min', 'sec'],
  defaultDurations: [1800000, 2700000, 3600000],
  data: {
    id: '',
    timeUnit: 'min',
    duration: '1800000',
    title: ''
  },
  updatedata: {
    id: '',
    timeUnit: 'min',
    duration: '1800000',
    title: ''
  },
  list: []
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case 'tasksChange':
      return {
        ...state,
        data: {...state.data, ...action.data}
      }
    case 'tasksAdd':
      return {
        ...state,
        data: initialState.data,
        list: [...state.list, state.data]
      }
    case 'tasksUpdate':
      return {
        ...state,
        updatedata: initialState.updatedata,
        list: state.map(t => t.id === state.updatedata.id ? state.updatedata.id : t)
      }
    case 'tasksDelete':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.id)
      }
    default:
      return state
  }
}
