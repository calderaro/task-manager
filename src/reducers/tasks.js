
const initialState = {
  defaultDurations: [1800000, 2700000, 3600000],
  timeUnits: ['mins', 'secs'],
  timeUnit: 'mins',
  dragging: null,
  draggingOver: null,
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
    case 'tasksSetDrag':
      return {
        ...state,
        dragging: action.task,
        draggingOver: action.task ? state.draggingOver : null
      }
    case 'setDraggingOverTask':
      return {
        ...state,
        draggingOver: action.task
      }
    case 'tasksReorder':
      const arr = state.list.filter(i => i.id !== action.task.id)
      return {
        ...state,
        list: [...arr.slice(0, action.index), action.task, ...arr.slice(action.index)]
      }
    default:
      return state
  }
}
