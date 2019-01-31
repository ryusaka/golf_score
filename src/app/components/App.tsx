import * as React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import theme from 'lib/theme'
import { history, store } from 'lib/store'
import TopPage from 'containers/TopPageContainer'
import Score from 'containers/ScoreContainer'
import Setup from 'containers/SetupContainer'
import Result from 'containers/ResultContainer'
import SetupUser from 'containers/SetupUserContainer'
import HistoryPage from 'containers/HistoryContainer'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/setup' component={Setup} />
            <Route path='/setup-user' component={SetupUser} />
            <Route path='/score' component={Score} />
            <Route path='/result' component={Result} />
            <Route path='/histories' component={HistoryPage} />
            <Route path='/' component={TopPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App