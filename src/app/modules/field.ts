import { Action } from 'redux'
import { Field } from 'common/types/models'
import { ThunkAction } from 'redux-thunk'
import { client as axiosClient } from 'lib/axiosClient'
import { RootState } from './reducer'

export type State = {
  field: Field.Model
  fields: Field.Model[]
}
export const ActionTypes = {
  LOAD: 'field/LOAD',
  LOAD_ALL: 'field/LOAD_ALL',
  CREATE_COURSE: 'field/CREATE_COURSE',
} as const

type LoadAction = Action<typeof ActionTypes.LOAD> & {
  field: Field.Model
}
export const createLoadAction = (field: Field.Model): LoadAction => ({
  type: ActionTypes.LOAD,
  field,
})

type LoadAllAction = Action<typeof ActionTypes.LOAD_ALL> & {
  fields: Field.Model[]
}
export const createLoadAllAction = (fields: Field.Model[]): LoadAllAction => ({
  type: ActionTypes.LOAD_ALL,
  fields,
})

export const loadAll = (): ThunkAction<void, RootState, typeof axiosClient, LoadAllAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.get('/api/fields')
    dispatch(createLoadAllAction(res.data.fields))
  }
}

export const load = (id): ThunkAction<void, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.get(`/api/fields/${id}`)
    dispatch(createLoadAction(res.data.field))
  }
}

export const createCourse = (fieldId, data): ThunkAction<void, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.post(`/api/fields/${fieldId}/courses`, data)
    dispatch(createLoadAction(res.data.field))
  }
}

type Actions = LoadAction | LoadAllAction

const initialState = {
  field: null,
  fields: [],
}

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.LOAD_ALL: {
      return {
        ...state,
        fields: action.fields,
      }
    }
    case ActionTypes.LOAD: {
      return {
        ...state,
        field: action.field,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
