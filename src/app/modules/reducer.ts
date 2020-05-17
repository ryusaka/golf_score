import { combineReducers, createStore, applyMiddleware, compose, AnyAction } from 'redux'
import { thunkWithClient } from 'lib/axiosClient'

import score from 'modules/score'
import field from 'modules/field'
import course from 'modules/course'
import auth from 'modules/auth'
import round from 'modules/round'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

export const reducer = combineReducers({
  auth,
  score,
  field,
  course,
  round,
})

const composeEnhancers =
  process.env.TARGET_ENV === 'production'
    ? compose
    : typeof window != 'undefined'
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose // eslint-disable-line dot-notation
    : compose

export const initializeStore = (initialState?: any) => {
  return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkWithClient)))
}

export type RootState = ReturnType<ReturnType<typeof initializeStore>['getState']>

export const useAppDispatch = (): ThunkDispatch<RootState, any, AnyAction> => useDispatch()
