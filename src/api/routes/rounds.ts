import * as moment from 'moment'
import { Course, Round } from '../models'
import * as roundLib from '../lib/round'
import { compObjRefs } from '../lib/util'
import type { Course as CourseType } from '../../common/types/models'

const index = async (req, res) => {
  const rounds = await roundLib.getAll(req.user._id)

  res.json({ rounds })
}

const show = async (req, res) => {
  const round = await roundLib.get(req.params.id)
  if (!round) return res.status(404).json({ message: 'not found' })
  if (!compObjRefs(req.user._id, round.user)) return res.status(403).json({ message: 'unauthorized' })

  res.json({ round })
}

const create = async (req, res) => {
  const courseSelect = ['_id', 'holes'] as const
  const course = (await Course.findById(req.body.course).select('holes').lean()) as Pick<
    CourseType.Model,
    typeof courseSelect[number]
  >
  if (!course) return res.status(400).json({ message: 'course not found' })

  const round = await Round.create({
    date: moment(req.body.date).toDate(),
    user: req.user._id,
    course: req.body.course,
    score: roundLib.getInitialScore({ holes: course.holes, names: req.body.names }),
  })

  return show({ ...req, params: { id: round._id } }, res)
}

const update = async (req, res) => {
  const exists = await Round.exists({ _id: req.params.id, user: req.user._id })
  if (!exists) return res.status(404).json({ message: 'not found' })
  const $set: any = {}
  if (req.body.score) $set.score = req.body.score
  await Round.updateOne({ _id: req.params.id }, { $set })

  return show(req, res)
}

export { index, show, create, update }
