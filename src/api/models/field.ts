import { Schema, model, Document } from 'mongoose'
import { Field } from '../../common/types/models'

const schema = new Schema(
  {
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    name: { type: Schema.Types.String, required: true },
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

export default model<Field.Model & Document>('Field', schema)
