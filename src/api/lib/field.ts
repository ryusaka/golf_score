import { Field } from '../models'
import type { Field as FieldType, MongoDefault } from '../../common/types/models'

const getAll = async () => {
  return Field.find().lean()
}

const get = async (id) => {
  return Field.findById(id).populate('courses').lean()
}

const create = async (data: Omit<FieldType.Model, keyof MongoDefault>) => {
  return Field.create(data)
}

export { getAll, get, create }
