import * as courseConfig from '../lib/course'

const index = async (req, res) => {
  const courses = await courseConfig.getAll()
  res.json({ courses })
}

const show = async (req, res) => {
  const course = await courseConfig.get(req.params.id)
  if (!course) return res.status(404).json({ message: 'not found' })
  res.json({ course })
}

export { index, show }
