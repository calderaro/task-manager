import omit from 'lodash/omit'

export const loadState = () => {
  try {
    const serialized = localStorage.getItem('store')

    if (!serialized) return undefined

    const state = JSON.parse(serialized)

    if (!state.date) return undefined

    const date = new Date(state.date)
    const current = new Date()
    const lapsed = current.getTime() - date.getTime()
    const hours24 = 86400000

    if (lapsed >= hours24) {
      localStorage.setItem('store', '')
      location.reload()
      return undefined
    }

    return omit(state, ['date'])
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem('store', serialized)
  } catch (err) {
    console.log(err)
  }
}
