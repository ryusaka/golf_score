import { Schema, Model, model } from 'mongoose'
import { IField } from '../../common/interfaces'

const schema: Schema = new Schema({
  name: String,
}, {
  toObject: {
    virtuals: true,
    transform: (doc, user) => {
      delete user.__v
      return user
    },
  },
})

const Field: Model<IField> = model<IField>('Field', schema)

export default Field