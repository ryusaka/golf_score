import { Course, Field } from '../models'
import type { Course as CourseType, MongoDefault } from '../../common/types/models'
import type { ClientSession } from 'mongoose'

const getAll = async () => {
  return Course.find().lean()
}

const get = async (id) => {
  return Course.findById(id).lean()
}

const create = async (
  fieldId: any,
  data: Omit<CourseType.Model, keyof MongoDefault>,
  { session }: { session?: ClientSession } = {}
) => {
  if (!(await Field.exists({ _id: fieldId }))) throw new Error('field not found')
  const [course] = await Course.create([data], { session })
  await Field.updateOne({ _id: fieldId }, { $push: { courses: course._id } }).session(session)
  return course
}

export { getAll, get, create }
