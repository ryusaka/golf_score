import { Action, Dispatch } from 'redux'
import { IFieldStore, IHole } from 'lib/interfaces'
import { set as setStore, get as getStore } from 'lib/storage'
export type State = IFieldStore

export enum FieldActions {
  LOAD = 'field/load',
  SET_HOLE = 'field/setHole',
  RESET = 'field/reset',
}

interface LoadAction extends Action {
  type: FieldActions.LOAD
  name: string
}

export const load = (name: string) => {
  return (dispatch: Dispatch) => {
    dispatch<LoadAction>({type: FieldActions.LOAD, name})
  }
}

interface SetHoleAction extends Action {
  type: FieldActions.SET_HOLE
  holes: IHole[]
}

export const setHole = (holes: IHole[]) => {
  return (dispatch: Dispatch) => {
    dispatch<SetHoleAction>({type: FieldActions.SET_HOLE, holes})
  }
}

interface ResetAction extends Action {
  type: FieldActions.RESET
}
export const reset = () => {
  return (dispatch: Dispatch) => {
    dispatch<ResetAction>({type: FieldActions.RESET})
  }
}

export type Actions = LoadAction | SetHoleAction | ResetAction

const init = () => {
  return {
    name: '',
    holes: [...new Array(9)].fill(1).map((_, idx) => ({number: idx + 1, par: 4})),
  }
}

const initialState = getStore('field') || init()

const reducer = (state: State = initialState, action: Actions): IFieldStore => {
  switch (action.type) {
    case FieldActions.LOAD: {
      const store = {
        ...state,
        name: action.name,
      }
      setStore('field', store)
      return store
    }
    case FieldActions.SET_HOLE: {
      const store =  {
        ...state,
        holes: action.holes,
      }
      setStore('field', store)
      return store
    }
    case FieldActions.RESET: {
      const store = init()
      setStore('field', store)
      return store
    }
    default: return state
  }
}

export default reducer
