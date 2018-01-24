
const initialState = {
  defaultDurations: [1800000, 2700000, 3600000],
  timeUnits: ['mins', 'secs'],
  timeUnit: 'mins',
  dragging: null,
  draggingOver: null,
  statusList: ['active', 'done', 'deleted'],
  statusFilter: 'active',
  durationList: ['all', 'short', 'medium', 'large'],
  durationFilter: 'all',
  data: {
    id: '',
    duration: 1800000,
    time: 1800000,
    title: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    finalizedAt: '',
    status: 'active'
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
        list: [
          ...state.list,
          {
            ...state.data,
            id: action.id,
            time: state.data.duration,
            createdAt: action.createdAt
          }
        ]
      }
    case 'tasksUpdate':
      return {
        ...state,
        data: initialState.data,
        list: state.list.map(t =>
          t.id === state.data.id
          ? {
            ...state.data,
            time: t.time >= state.data.duration ? state.data.duration : t.time,
            updatedAt: action.updatedAt
          }
          : t)
      }
    case 'tasksDelete':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.id)
      }
    case 'tasksSoftDelete':
      return {
        ...state,
        list: state.list.map(t =>
          t.id === action.task.id
          ? {...t, status: 'deleted', deletedAt: action.deletedAt}
          : t)
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
    case 'tasksTick':
      const currentTask = state.list.find(e => e.status === 'active')
      const list = currentTask
        ? state.list.map(task =>
          task.id === currentTask.id
          ? task.time >= 1000
            ? {...task, time: task.time - 1000}
            : {...task, time: 0, status: 'done'}
          : task)
        : state.list
      return {
        ...state,
        list
      }
    case 'taskSetDone':
      return {
        ...state,
        list: state.list.map(t => t.id === action.id ? {...t, status: 'done'} : t)
      }
    case 'taskResetTime':
      return {
        ...state,
        list: state.list.map(t => t.id === action.id ? {...t, time: t.duration} : t)
      }
    case 'tasksSetStatusFilter':
      return {
        ...state,
        statusFilter: action.data
      }
    case 'tasksSetDurationFilter':
      return {
        ...state,
        durationFilter: action.data
      }
    case 'tasksImport':
      return {
        ...state,
        list: [...state.list, ...action.data]
      }
    default:
      return state
  }
}
