import fallback from 'express-history-api-fallback'
import * as path from 'path'
import compression from 'compression'
import * as express from 'express'
import * as bodyParser from 'body-parser'

process.on('uncaughtException', err => {
  const message = `API Uncaught Exception: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

process.on('unhandledRejection', err => {
  const message = `API Unhandled Rejection: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

const app = express()
app.use(compression({
  level: 9,
  memLevel: 9,
}))
app.listen(process.env.PORT, () => {
  console.log('Starting server on %s', app.get('port'))
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '1mb'}))

app.use(express.static(path.join(__dirname, '../../dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})
app.use(fallback('index.html', { root: '../../dist' }))