import path from 'path'
import http from 'http'
import express from 'express'
import compress from 'compression'
import helmet from 'helmet'
import chalk from 'chalk'
import html from './helpers/html'

const log = console.log
const title = 'Task Manager'
const NODE_ENV = process.env.NODE_ENV || 'development'
const target = process.env.target || 'development'
const PORT = process.env.port || 3012

const app = express()
const server = http.createServer(app)

app
  .use(helmet())
  .use(helmet.noCache())
  .use(compress())
  .use('/api', require('./controllers/').default)
  .use('/static', express.static(path.join(__dirname, '../static')))

if (NODE_ENV === 'production') {
  const render = require('./helpers/render').default
  const rootReducer = require('./reducers/').default
  const ctrls = require('./controllers/').default
  const routes = require(`../build/${target}/routes`).default

  app
    .use(render(routes, rootReducer, html))
    .use('/build', express.static(path.join(__dirname, '../build')))
    .use('/', ctrls)
    .get('*', (req, res) => res.render())

  process.on('SIGINT', () => server.close(err => process.exit(err ? 1 : 0)))
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config.dev')
  const compiler = webpack(webpackConfig)

  app
    .use(webpackDevMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}))
    .use(webpackHotMiddleware(compiler))
    .get('*', (req, res) => res.status(200).send(html({head: {title}})))
}

server.listen(PORT, () =>
    log(chalk.green(`Listening at port ${PORT} in ${NODE_ENV} mode targeting ${target}`)))

process.on('uncaughtException', err =>
  err.code === 'EADDRINUSE' ? log(chalk.red(`Port ${PORT} in use`)) : log(chalk.red(err.code)))
