import window from 'global/window'
const isObj = (value) => Object.prototype.toString.call(value) === '[object Object]'
export const setModal = (data) => (dispatch, getState) => {
  const init = { modal: null, value: null, block: true, e: null }
  const cleaned = isObj(data) ? {...init, ...data} : {...init, modal: data}
  const {modal, value, block, e} = cleaned
  if (e) e.stopPropagation()
  dispatch({ type: 'setModal', data: { modal, value, block } })
}
export const closeAll = () => ({ type: 'closeAll' })
export const setDimensions = () => ({ type: 'setDimensions', h: window.innerHeight, w: window.innerWidth })
