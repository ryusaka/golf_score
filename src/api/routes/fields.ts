import { Field } from '../models'

const index = async (req, res) => {
  const fields = await Field.find().lean()
  res.json(fields)
}

const create = async (req, res) => {
  const { name } = req.body
  const exists = await Field.findOne({name})
  if (exists) return res.status(400).json({message: 'Already exists'})
  const field = await Field.create({name})
  res.json(field)
}

export default {
  index,
  create,
}