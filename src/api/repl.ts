import * as repl from 'repl'
import * as fs from 'fs'
import * as models from './models'

const HISTORY_DIRECTORY = __dirname + '/.ym_history'
let history
try {
  history = fs.readFileSync(HISTORY_DIRECTORY, { encoding: 'utf-8' })
} catch (e) {
  history = ''
}

import mongo from './lib/mongo'

mongo().then((mongoose) => {
  console.log('REPL with async/await and mongoose! 🐍')
  const replInstance = repl.start({ prompt: '> ', terminal: true })
  // @ts-ignore
  replInstance.history = history.split('\n')
  for (const key of Object.keys(models)) {
    replInstance.context[key] = models[key]
  }

  replInstance.on('exit', () => {
    // @ts-ignore
    fs.writeFileSync(HISTORY_DIRECTORY, replInstance.history.slice(-10000).join('\n'))
    mongoose.disconnect()
  })
})
