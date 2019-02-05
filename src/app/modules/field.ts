import { Action, Dispatch } from 'redux'
import * as uuid from 'uuid/v4'
import { IFieldStore, IHole } from 'lib/interfaces'
import { set as setStore, get as getStore } from 'lib/storage'
export type State = IFieldStore

export enum FieldActions {
  CREATE = 'field/create',
  LOAD_FROM_LIST = 'field/loadFromList',
}

interface CreateAction extends Action {
  type: FieldActions.CREATE
  name: string
  holes: IHole[]
}

export const create = (name: string, holes) => {
  return (dispatch: Dispatch) => {
    dispatch<CreateAction>({type: FieldActions.CREATE, name, holes})
  }
}

interface LoadFromListAction extends Action {
  type: FieldActions.LOAD_FROM_LIST
  field: IFieldStore
}
export const loadFromHistory = (field: IFieldStore) => {
  return (dispatch: Dispatch) => {
    dispatch<LoadFromListAction>({type: FieldActions.LOAD_FROM_LIST, field})
  }
}

export type Actions = CreateAction  | LoadFromListAction

const init = () => {
  return {
    name: '',
    holes: [...new Array(9)].fill(1).map((_, idx) => ({number: idx + 1, par: 4})),
    id: 'initial',
  }
}

const initialState = getStore('field') || init()

const reducer = (state: State = initialState, action: Actions): IFieldStore => {
  switch (action.type) {
    case FieldActions.CREATE: {
      const field = {
        name: action.name,
        holes: action.holes,
      }
      const fields = getStore('fields') || []
      fields.push(Object.assign({id: uuid()}, field))
      setStore('fields', fields)
      return state
    }
    case FieldActions.LOAD_FROM_LIST: {
      const store = action.field
      setStore('field', store)
      return store
    }
    default: return state
  }
}

export default reducer
