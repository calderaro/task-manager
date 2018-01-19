import createBrowserHistory from 'history/createBrowserHistory'

const createHistory = process.env.targetenv === 'browser' ? createBrowserHistory() : {}

export default createHistory
