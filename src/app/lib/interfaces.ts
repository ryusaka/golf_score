export interface IScoreStore {
  score?: IScores
  scores: IScores[]
  now: number
}

export interface IScores {
  scores: IScore[]
  player: string
}

export interface IScore {
  stroke: number
  pat?: number
  medal?: string
}

export enum Par {
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export interface IPlayer {
  name: string
  id: string
}

export interface IField {
  name: string
  holes: IHole[]
}

export interface IHole {
  number: number
  par: number
}

export type IFieldStore = IField

export interface IPlayerStore {
  players: IPlayer[]
}
