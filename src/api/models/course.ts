import { Schema, model, Document } from 'mongoose'

import { Course } from '../../common/types/models'

const holeSchema = new Schema<Course.Hole>({
  number: { type: Schema.Types.Number },
  distance: {
    type: {
      back: { type: Schema.Types.Number },
      ladies: { type: Schema.Types.Number },
      regular: { type: Schema.Types.Number, required: true },
    },
    required: true,
  },
  par: { type: Schema.Types.Number, required: true },
})

const schema = new Schema(
  {
    holes: { type: [holeSchema], required: true },
    name: { type: Schema.Types.String, required: true },
    field: { type: Schema.Types.ObjectId, ref: 'Field', required: true },
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

export default model<Course.Model & Document>('Course', schema)
