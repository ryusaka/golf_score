import { Action, Dispatch } from 'redux'
import * as uuid from 'uuid/v4'
import { IPlayerStore, IPlayer, IScores } from 'lib/interfaces'
import { set as setStore, get as getStore } from 'lib/storage'
import { LoadAllAction as loadAllScoreAction, ScoreActions } from 'modules/score'
export type State = IPlayerStore

export const enum PlayerActions {
  SET_PLAYER = 'player/setPlayer',
  RESET = 'player/reset',
}

interface SetPlayerAction extends Action {
  type: PlayerActions.SET_PLAYER
  players: IPlayer[]
}

export const set = (players: {name: string}[]) => {
  return (dispatch: Dispatch) => {
    const idAdded: IPlayer[] = players.filter(p => p.name).map(p => ({
      name: p.name,
      id: uuid(),
    }))
    dispatch<SetPlayerAction>({type: PlayerActions.SET_PLAYER, players: idAdded})
    const scores: IScores[] = idAdded.map(p => ({
      player: p.id,
      scores: new Array(9).fill(0).map((_, idx) => ({stroke: 0})),
    }))
    dispatch<loadAllScoreAction>({type: ScoreActions.LOAD_ALL, scores})
  }
}

interface ResetAction extends Action {
  type: PlayerActions.RESET
}
export const reset = () => {
  return (dispatch: Dispatch) => {
    dispatch<ResetAction>({type: PlayerActions.RESET})
  }
}

export type Actions = SetPlayerAction | ResetAction

const init = () => {
  return {
    players: [],
  }
}

const initialState = getStore('player') || init()

const reducer = (state: State = initialState, action: Actions): IPlayerStore => {
  switch (action.type) {
    case PlayerActions.SET_PLAYER: {
      const store = {
        ...state,
        players: action.players,
      }
      setStore('player', store)
      return store
    }
    case PlayerActions.RESET: {
      const store = init()
      setStore('player', store)
      return store
    }
    default: return state
  }
}

export default reducer
