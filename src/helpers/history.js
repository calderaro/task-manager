import createBrowserHistory from 'history/createBrowserHistory'

const createHistory = process.env.TARGETENV === 'browser' ? createBrowserHistory() : {}

export default createHistory
