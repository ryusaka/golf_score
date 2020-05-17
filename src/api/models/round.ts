import { Schema, model, Document } from 'mongoose'
import { Round } from '../../common/types/models'
import { medals } from '../../common/lib/medal'

const holeScoreSchema = new Schema(
  {
    medal: { type: Schema.Types.String, enum: Object.keys(medals) },
    put: { type: Schema.Types.Number },
    stroke: { type: Schema.Types.Number, required: true },
    number: { type: Schema.Types.Number },
  },
  { _id: false }
)
const otherScoreScheme = new Schema({
  name: { type: Schema.Types.String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  score: { type: [holeScoreSchema], required: true },
})
const scoreSchema = new Schema({
  mine: { type: [holeScoreSchema] },
  others: { type: [otherScoreScheme] },
})
const schema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    tee: { type: Schema.Types.String, default: 'regular', enum: ['regular', 'back', 'ladies'] },
    date: { type: Date, required: true },
    score: { type: scoreSchema, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: (doc, user) => {
        delete user.__v
        return user
      },
    },
  }
)

export default model<Round.Model & Document>('Round', schema)
