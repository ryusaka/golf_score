import * as mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'
import * as crypto from 'crypto'
import type { User as UserModel } from '../../common/types/models'
const Schema = mongoose.Schema

const transform = (doc, user) => {
  delete user.__v
  user.password = !!user.password
  return user
}

const schema = new Schema(
  {
    name: { type: Schema.Types.String },
    userId: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true, select: false },
    token: { type: Schema.Types.String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform,
    },
    toObject: {
      virtuals: true,
      transform,
    },
  }
)

export const cipher = (id, password) => {
  return crypto.pbkdf2Sync(password, id, 96, 32, 'sha512').toString('hex')
}
schema.statics.cipher = cipher

export const verify = async (id, password) => {
  const user = await model.findById(id).select('+password _id').lean()
  return user.password === cipher(user._id.toHexString(), password)
}
schema.statics.verify = verify

export const generateToken = () => {
  const length = 32
  const chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789_-'
  const rnd = crypto.randomBytes(length)
  const ret = []
  for (let i = 0; i < length; i++) {
    ret.push(chars[rnd[i] % chars.length])
  }
  return ret.join('')
}
schema.statics.generateToken = generateToken

const model = mongoose.model<UserModel.Model & Document, UserModel.Static & Model<UserModel.Model & Document>>(
  'User',
  schema
)
export default model
