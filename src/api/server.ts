import * as fallback from 'express-history-api-fallback'
import * as config from 'config'
import * as log4js from 'log4js'
log4js.configure(config.get('log4js'))

process.on('uncaughtException', err => {
  const message = `API Uncaught Exception: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

process.on('unhandledRejection', err => {
  const message = `API Unhandled Rejection: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

import * as express from 'express'
const app = express()

const logger = log4js.getLogger()
const expressLogger = log4js.connectLogger(logger, {level: 'auto'})
app.use(expressLogger)

/**
 * mongoose settings
 */
import mongo from './lib/mongo'
mongo().then(() => {
  const port = process.env.PORT || config.get('port')
  const server = app.listen(port, () => {
    // @ts-ignore
    console.log('Starting server on %s', server.address().port)
  })
})

app.use(express.static(config.get('static')))

/**
 * wrapper for async/await error handling
 */
function wrap(handler) {
  return async function(req, res, next) {
    try {
      await handler(req, res, next)
    } catch (err) {

      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({message: 'not found'})
      }

      console.error('Internal Server Error')
      console.error(err)
      if (!res.headersSent) {
        res.status(500).json({message: 'Internal Server Error'})
      }

      const message = `API ERROR: ${err.name || 'Unknown'}\n${req.method} ${req.originalUrl}\nbody: ${JSON.stringify(req.body)}\n${err.message}\n${err.stack}`
      console.error(message)
    }
  }
}

/**
 * express routes
 */
import {
  users, competitions,
} from './routes'

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '1mb'}))

app.use(
  '/api/users',
  express
    .Router()
    .get('/', wrap(users.index))
    .post('/', wrap(users.create))
)

app.use(
  '/api/competitions',
  express
    .Router()
    .get('/', wrap(competitions.index))
)

app.use(fallback('index.html', { root: 'dist' }))