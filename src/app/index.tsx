import * as React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

import App from 'components/App'
render(<App />, document.getElementById('root'))
hot(module)(App)
