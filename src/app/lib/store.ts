import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from 'modules/reducer'
import { State as ScoreState, Actions as ScoreActions } from 'modules/score'
import { State as FieldState, Actions as FieldActions } from 'modules/field'
import { State as PlayerState, Actions as PlayerActions } from 'modules/player'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

// redux-devtoolの設定
const composeEnhancers = process.env.TARGET_ENV === 'production' ? compose : (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose)

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
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