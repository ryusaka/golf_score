import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from 'modules/reducer'
import { State as ScoreState, Actions as ScoreActions, ScoreActions as SA } from 'modules/score'
import { State as FieldState, Actions as FieldActions } from 'modules/field'
import { State as PlayerState, Actions as PlayerActions } from 'modules/player'
import thunk from 'redux-thunk'
import { get as getStore, set as setStore } from 'lib/storage'

export const history = createBrowserHistory()
const lastPath = getStore('lastPath')
if (/\/score/.test(lastPath)) {
  history.replace(lastPath)
}

// redux-devtoolの設定
const composeEnhancers = process.env.TARGET_ENV === 'production' ? compose : (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose)

const historyStore = store  => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.location.pathname}${action.payload.location.search}`
    setStore('lastPath', nextPage)
  }
  return next(action)
}

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      historyStore,
      thunk,
    ),
  ),
)

export type ReduxState = {
  score: ScoreState
  field: FieldState
  player: PlayerState
}

export type ReduxAction = ScoreActions | FieldActions | PlayerActions