import { Round } from '../models'
import type { Round as RoundType, Course as CourseType } from '../../common/types/models'

const getAll = async (userId) => {
  return Round.find({ user: userId }).populate('course').lean()
}

const get = async (id) => {
  return Round.findById(id).populate('course').lean()
}

const getInitialScore = (data: { holes: CourseType.Hole[]; names: string[] }): RoundType.Model['score'] => {
  const initialScore = data.holes.map((hole) => ({
    stroke: hole.par,
    number: hole.number,
  }))
  return {
    mine: initialScore,
    others: data.names.map((name) => ({
      name,
      score: initialScore,
    })),
  }
}

export { getAll, get, getInitialScore }
