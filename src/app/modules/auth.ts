import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { client as axiosClient } from 'lib/axiosClient'
import * as storage from 'lib/storage'

import type { RootState } from 'modules/reducer'
import type { User } from 'common/types/models'

export type State = {
  user: User.Model
}
const ActionTypes = {
  SET_USER: 'auth/SET_USER',
  LOGIN_FAILED: 'auth/LOGIN_FAILED',
} as const

type LoginFailedAction = Action<typeof ActionTypes.LOGIN_FAILED> & {
  message: string
}
export const createLoginFailedAction = (message: string): LoginFailedAction => ({
  type: ActionTypes.LOGIN_FAILED,
  message,
})

type UserAction = Action<typeof ActionTypes.SET_USER> & {
  user: User.Model
}
export const createUserAction = (user: User.Model): UserAction => ({
  type: ActionTypes.SET_USER,
  user,
})
export const setUser = (user): ThunkAction<void, RootState, typeof axiosClient, UserAction> => {
  return (dispatch, getState) => {
    dispatch(createUserAction(user))
  }
}

export const login = (
  userId: string,
  password: string
): ThunkAction<void, RootState, typeof axiosClient, UserAction | LoginFailedAction> => {
  return async (dispatch, getState, client) => {
    try {
      const res = await client.post('/api/login', { userId, password })
      dispatch(createUserAction(res.data.user))
    } catch (e) {
      console.log(e)
      dispatch(createLoginFailedAction(e.message))
    }
  }
}

export const signUp = (
  userId: string,
  password: string
): ThunkAction<void, RootState, typeof axiosClient, UserAction | LoginFailedAction> => {
  return async (dispatch, getState, client) => {
    try {
      const res = await client.post('/api/sign-up', { userId, password })
      dispatch(createUserAction(res.data.user))
    } catch (e) {
      dispatch(createLoginFailedAction(e.message))
    }
  }
}

export const load = (): ThunkAction<void, RootState, typeof axiosClient, UserAction | LoginFailedAction> => {
  return async (dispatch, getState, client) => {
    try {
      const res = await client.get('/api/@me')
      dispatch(createUserAction(res.data.user))
    } catch (e) {
      dispatch(createLoginFailedAction(e.message))
    }
  }
}

type Actions = UserAction

const initialState = {
  user: storage.get('user') || null,
}

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      storage.set('user', action.user)
      return {
        ...state,
        user: action.user,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
