import { medals } from '../lib/medal'
import { cipher, generateToken, verify } from '../../api/models/user'

export type MongoDefault = {
  _id: any
  createdAt: Date
  updatedAt: Date
}

export namespace User {
  type Model = MongoDefault & {
    name?: string
    userId: string
    password: string
    token: string
  }
  type Static = {
    cipher: typeof cipher
    generateToken: typeof generateToken
    verify: typeof verify
  }
}

export namespace Field {
  type Model = MongoDefault & {
    name: string
    courses: Partial<Course.Model>[]
  }
}

export namespace Course {
  type Distance = {
    regular: number
    back?: number
    ladies?: number
  }
  type Hole = {
    distance: Distance
    par: number
    number?: number
    _id: any
  }
  type Model = MongoDefault & {
    name: string
    holes: Hole[]
    field: Partial<Field.Model>
  }
}

export namespace Round {
  type Score = {
    stroke: number
    put?: number
    medal?: Medal
    number?: number
  }
  type OtherScore = Partial<Pick<MongoDefault, '_id'>> & {
    name: string
    user?: User.Model['_id']
    score: Score[]
  }
  type Model = MongoDefault & {
    date: Date
    user: Partial<User.Model>
    course: Partial<Course.Model>
    tee: 'regular' | 'back' | 'ladies'
    score: {
      mine: Score[]
      others: OtherScore[]
    }
  }
}

export type Medal = keyof typeof medals
