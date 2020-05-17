import 'source-map-support/register' // support stack trace on ts file

import * as dotenv from 'dotenv'
dotenv.config()
import * as config from 'config'
import * as log4js from 'log4js'
import next from 'next'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'

import mongo from './lib/mongo'

import { User } from './models'
import { users, fields, courses, rounds } from './routes'

log4js.configure(config.get('log4js'))

process.on('uncaughtException', (err) => {
  const message = `API Uncaught Exception: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

process.on('unhandledRejection', (source) => {
  if (source instanceof Error) {
    const message = `API Unhandled Rejection: ${source.name || 'Unknown'}\n\n${source.message}\n${source.stack}`
    console.error(message)
  } else {
    console.error(source)
  }
})

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || config.get('port')

const server = express()

const app = next({ dev, dir: config.get('nextDir') })
const handler = app.getRequestHandler()

const logger = log4js.getLogger()
const expressLogger = log4js.connectLogger(logger, { level: 'auto' })

server.use(passport.initialize())

passport.use(
  new BearerStrategy(function (token, done) {
    User.findOne({ token })
      .lean()
      .exec((err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false)
        return done(null, user)
      })
  })
)
passport.use(new AnonymousStrategy())
const authenticate = passport.authenticate('bearer', { session: false })
const partialAuth = passport.authenticate(['bearer', 'anonymous'], { session: false })

server.use(expressLogger)
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json({ limit: '1mb' }))
server.use(express.static(config.get('static')))

const wrap = (handler: Function) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      console.error('Internal Server Error')
      console.error(err)
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'not found' })
      }

      if (!res.headersSent) {
        res.status(500).json({ message: 'Internal Server Error' })
      }

      const message = `API ERROR: ${err.name || 'Unknown'}\n${req.method} ${req.originalUrl}\nbody: ${JSON.stringify(
        req.body
      )}\n${err.message}\n${err.stack}`
      console.error(message)
    }
  }
}

const apiRouter = express.Router()
apiRouter
  .get('/@me', authenticate, wrap(users.show))
  .post('/login', partialAuth, wrap(users.login))
  .post('/sign-up', wrap(users.signUp))
  .get('/fields', wrap(fields.index))
  .get('/fields/:id', wrap(fields.show))
  .get('/fields/:id/courses', wrap(courses.index))
  .post('/fields/:id/courses', wrap(fields.createCourse))
  .get('/fields/:id/courses/:courseId', wrap(fields.showCourse))
  .get('/courses', wrap(courses.index))
  .get('/courses/:id', wrap(courses.show))
  .get('/rounds', authenticate, wrap(rounds.index))
  .post('/rounds', authenticate, wrap(rounds.create))
  .get('/rounds/:id', authenticate, wrap(rounds.show))
  .put('/rounds/:id', authenticate, wrap(rounds.update))

server.use('/api', apiRouter)
server.get('*', partialAuth, (req, res) => {
  return handler(req, res)
})

const main = async () => {
  await app.prepare()
  await mongo()

  server.listen(port, () => {
    // @ts-ignore
    console.log('Starting server on %s', port)
    console.debug(`> Ready on http://localhost:${port}`)
  })
}

/**
 * mongoose settings
 */

/**
 * express routes
 */
// import {
//   users, competitions,
// } from './routes'

// server.use(
//   '/api/users',
//   express
//     .Router()
//     .get('/', wrap(users.index))
//     .post('/', wrap(users.create))
// )

// server.use(
//   '/api/competitions',
//   express
//     .Router()
//     .get('/', wrap(competitions.index))
// )

// server.use(fallback('index.html', { root: 'dist' }))

try {
  main()
} catch (e) {
  console.error(e.stack)
  process.exit(1)
}
