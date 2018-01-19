import createBrowserHistory from 'history/createBrowserHistory'

const createHistory = process.env.TARGETenv === 'browser' ? createBrowserHistory() : {}

export default createHistory
