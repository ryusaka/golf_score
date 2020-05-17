import * as mongoose from 'mongoose'
import { Field } from '../models'
import * as fieldConfig from '../lib/field'
import * as courseConfig from '../lib/course'

const index = async (req, res) => {
  const fields = await fieldConfig.getAll()
  res.json({ fields })
}

const show = async (req, res) => {
  const field = await fieldConfig.get(req.params.id)
  if (!field) return res.status(404).json({ message: 'not found' })
  res.json({ field })
}

const create = async (req, res) => {
  const { name } = req.body
  const exists = await Field.findOne({ name })
  if (exists) return res.status(400).json({ message: 'Already exists' })
  const field = await fieldConfig.create({ name, courses: [] })
  res.json({ field })
}

const createCourse = async (req, res) => {
  const { name, holes } = req.body
  const exists = await Field.exists({ _id: req.params.id })
  if (!exists) return res.status(404).json({ message: 'not found' })
  const session = await mongoose.startSession()
  await courseConfig.create(req.params.id, { name, holes, field: req.params.id }, { session })
  const field = await fieldConfig.get(req.params.id)
  return res.json({ field })
}

const showCourse = async (req, res) => {
  if (!(await Field.exists({ _id: req.params.id, courses: req.params.courseId })))
    return res.status(404).json({ message: 'not found' })
  const course = await courseConfig.get(req.params.courseId)
  if (!course) return res.status(404).json({ message: 'not found' })
  res.json({ course })
}

export { index, show, create, createCourse, showCourse }
