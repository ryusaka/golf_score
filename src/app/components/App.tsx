import * as React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import theme from 'lib/theme'
import { history, store } from 'lib/store'
import TopPage from 'containers/TopPageContainer'
import Score from 'containers/ScoreContainer'
import SetupField from 'containers/SetupFieldContainer'
import Result from 'containers/ResultContainer'
import SetupUser from 'containers/SetupUserContainer'
import HistoryPage from 'containers/HistoryContainer'
import FieldTop from 'containers/FieldTopContainer'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path='/setup-user' component={SetupUser} />
            <Route exact path='/fields/new' component={SetupField} />
            <Route exact path='/fields' component={FieldTop} />
            <Route exact path='/score' component={Score} />
            <Route exact path='/result' component={Result} />
            <Route exact path='/histories' component={HistoryPage} />
            <Route path='/' component={TopPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App