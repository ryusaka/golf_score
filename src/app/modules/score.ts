import { Action, Dispatch } from 'redux'
import { IScores, IScoreStore, IPlayer } from 'lib/interfaces'
import { set as setStore, get as getStore } from 'lib/storage'
import { ReduxState } from 'lib/store';
export type State = IScoreStore

export enum ScoreActions {
  LOAD = 'score/load',
  LOAD_ALL = 'score/loadAll',
  FORWARD = 'score/forward',
  BACK = 'score/back',
  MEDAL_SELECT = 'score/medalSelect',
  RESET = 'score/reset',
  INCREMENT ='score/increment',
  DECREMENT ='score/decrement',
  FINISH = 'score/finish',
}

export interface LoadAction extends Action {
  type: ScoreActions.LOAD
  score: IScores
}

export const load = (score: IScores) => {
  return (dispatch) => {
    dispatch({type: ScoreActions.LOAD, score})
  }
}

interface IncrementAction extends Action {
  type: ScoreActions.INCREMENT
  player: IPlayer
  hole: number
}
export const increment = (player: IPlayer, hole: number) => {
  return (dispatch: Dispatch) => {
    dispatch<IncrementAction>({type: ScoreActions.INCREMENT, player, hole})
  }
}

interface DecrementAction extends Action {
  type: ScoreActions.DECREMENT
  player: IPlayer
  hole: number
}
export const decrement = (player: IPlayer, hole: number) => {
  return (dispatch: Dispatch) => {
    dispatch<DecrementAction>({type: ScoreActions.DECREMENT, player, hole})
  }
}

export interface LoadAllAction extends Action {
  type: ScoreActions.LOAD_ALL
  scores: IScores[]
}
export const loadAll = (scores: IScores[]) => {
  return (dispatch: Dispatch) => {
    dispatch<LoadAllAction>({type: ScoreActions.LOAD_ALL, scores})
  }
}

interface ForwardAction extends Action {
  type: ScoreActions.FORWARD
}
export const forward = () => {
  return (dispatch) => {
    dispatch({type: ScoreActions.FORWARD})
  }
}

interface BackAction extends Action {
  type: ScoreActions.BACK
}
export const back = () => {
  return (dispatch) => {
    dispatch({type: ScoreActions.BACK})
  }
}

interface MedalSelectAction extends Action {
  type: ScoreActions.MEDAL_SELECT
  medal: string
  player: IPlayer
  hole: number
}
export const medalSelect = (medal, player, hole) => {
  return (dispatch: Dispatch) => {
    dispatch<MedalSelectAction>({type: ScoreActions.MEDAL_SELECT, medal, player, hole})
  }
}

interface ResetAction extends Action {
  type: ScoreActions.RESET
  players: IPlayer[]
}
export const reset = () => {
  return (dispatch: Dispatch, getState: () => ReduxState) => {
    const players = getState().player.players
    dispatch<ResetAction>({type: ScoreActions.RESET, players})
  }
}

interface FinishAction extends Action {
  type: ScoreActions.FINISH
}
export const finish = () => {
  return (dispatch: Dispatch) => {
    dispatch<FinishAction>({type: ScoreActions.FINISH})
  }
}

export type Actions = LoadAction | LoadAllAction | ForwardAction | BackAction | MedalSelectAction | ResetAction | IncrementAction | DecrementAction | FinishAction

const init = (players) => {
  const scores: IScores[] = players.map(p => ({
    player: p.id,
    scores: new Array(9).fill(0).map(s => ({stroke: 1}))
  }))
  return {
    scores,
    score: null,
    now: 1,
  }
}

const initialState = getStore('score') || init((getStore('player') || {}).players || [])

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ScoreActions.LOAD: {
      return {
        ...state,
        score: action.score,
      }
    }
    case ScoreActions.LOAD_ALL: {
      return {
        ...state,
        scores: action.scores,
      }
    }
    case ScoreActions.FORWARD: {
      return {
        ...state,
        now: state.now + 1
      }
    }
    case ScoreActions.BACK: {
      return {
        ...state,
        now: state.now !== 0 ? state.now - 1 : state.now
      }
    }
    case ScoreActions.INCREMENT: {
      const scores = state.scores
      const idx = scores.findIndex(s => s.player === action.player.id)
      scores[idx].scores[action.hole - 1].stroke++
      return {
        ...state,
        scores,
      }
    }
    case ScoreActions.DECREMENT: {
      const scores = state.scores
      const idx = scores.findIndex(s => s.player === action.player.id)
      if (scores[idx].scores[action.hole - 1].stroke > 1) {
        scores[idx].scores[action.hole - 1].stroke--
      }
      return {
        ...state,
        scores,
      }
    }
    case ScoreActions.MEDAL_SELECT: {
      const scores = state.scores
      const idx = scores.findIndex(s => s.player === action.player.id)
      if (scores[idx].scores[action.hole - 1].medal === action.medal) {
        scores[idx].scores[action.hole - 1].medal = ''
      } else {
        scores[idx].scores[action.hole - 1].medal = action.medal
      }
      const store = {
        ...state,
        scores,
      }
      setStore('score', store)
      return store
    }
    case ScoreActions.FINISH: {
      return state
    }
    case ScoreActions.RESET: {
      const store = init(action.players)
      setStore('score', store)
      return store
    }
    default: return state
  }
}

export default reducer
