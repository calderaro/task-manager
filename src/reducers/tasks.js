const initialState = {
  defaultDurations: [1800000, 2700000, 3600000],
  timeUnits: ['mins', 'secs'],
  timeUnit: 'mins',
  data: {
    id: '',
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
        list: [...state.list, {...state.data, id: action.id}]
      }
    case 'tasksUpdate':
      return {
        ...state,
        data: initialState.data,
        list: state.list.map(t => t.id === state.data.id ? state.data : t)
      }
    case 'tasksDelete':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.id)
      }
    case 'tasksSoftDelete':
      return {
        ...state,
        list: state.list.map(t => t.id === action.data.id ? {...t, deleted: true} : t)
      }
    case 'tasksSelectDuration':
      return {
        ...state,
        data: {...state.data, duration: action.data}
      }
    case 'tasksSelectTimeUnit':
      return {
        ...state,
        timeUnit: action.data
      }
    case 'tasksSelectTask':
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
