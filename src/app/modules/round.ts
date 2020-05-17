import { Action } from 'redux'
import { Round } from 'common/types/models'
import { ThunkAction } from 'redux-thunk'
import { client as axiosClient } from 'lib/axiosClient'
import { RootState } from './reducer'

export type State = {
  rounds: Round.Model[]
  round: Round.Model
  currentHole: number
}
export const ActionTypes = {
  LOAD_ALL: 'round/LOAD_ALL',
  LOAD: 'round/LOAD',
  MOVE_HOLE: 'round/MOVE_HOLE',
} as const

type LoadAllAction = Action<typeof ActionTypes.LOAD_ALL> & {
  rounds: Round.Model[]
}
export const createLoadAllAction = (rounds: Round.Model[]): LoadAllAction => ({
  type: ActionTypes.LOAD_ALL,
  rounds,
})

type LoadAction = Action<typeof ActionTypes.LOAD> & {
  round: Round.Model
}
export const createLoadAction = (round: Round.Model): LoadAction => ({
  type: ActionTypes.LOAD,
  round,
})

type MoveHoleAction = Action<typeof ActionTypes.MOVE_HOLE> & {
  payload: {
    to: number
  }
}
export const createMoveHoleAction = (to: number): MoveHoleAction => ({
  type: ActionTypes.MOVE_HOLE,
  payload: { to },
})

export const loadAll = (): ThunkAction<Promise<LoadAllAction>, RootState, typeof axiosClient, LoadAllAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.get('/api/rounds')
    return dispatch(createLoadAllAction(res.data.rounds))
  }
}

export const load = (id): ThunkAction<Promise<LoadAction>, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.get(`/api/rounds/${id}`)
    return dispatch(createLoadAction(res.data.round))
  }
}

export const create = ({
  course,
  partnerNames,
}): ThunkAction<Promise<LoadAction>, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.post('/api/rounds', { course, names: partnerNames })
    return dispatch(createLoadAction(res.data.round))
  }
}

export const update = (id, data): ThunkAction<Promise<LoadAction>, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.put(`/api/rounds/${id}`, data)
    return dispatch(createLoadAction(res.data.round))
  }
}

export const moveHole = (to: number): ThunkAction<MoveHoleAction, RootState, typeof axiosClient, MoveHoleAction> => {
  return (dispatch) => {
    return dispatch(createMoveHoleAction(to))
  }
}

type Actions = LoadAllAction | LoadAction | MoveHoleAction

const initialState = {
  rounds: [],
  round: null,
  currentHole: 1,
}

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.LOAD_ALL: {
      return {
        ...state,
        rounds: action.rounds,
      }
    }
    case ActionTypes.LOAD: {
      return {
        ...state,
        round: action.round,
      }
    }
    case ActionTypes.MOVE_HOLE: {
      return {
        ...state,
        currentHole: action.payload.to,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
