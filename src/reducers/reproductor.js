const initialState = {
  status: null,
  volume: 100,
  muted: false,
  seek: 0,
  duration: 0,
  track: null,
  tracks: {},
  indexes: []
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case 'reproductorSetStatus':
      return {...state, status: action.data}
    case 'reproductorSetPlay':
      return {...state, ...action.data}
    case 'reproductorStep':
      return {...state, seek: action.seek, duration: action.duration}
    case 'reproductorMute':
      return {...state, muted: action.muted}
    case 'reproductorSetVolume':
      return {...state, volume: action.volume}
    default:
      return state
  }
}
