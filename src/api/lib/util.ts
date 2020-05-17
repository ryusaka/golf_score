import { ObjectId } from 'mongodb'

export const compObjRefs = (
  a: string | ObjectId | { _id?: string | ObjectId },
  b: string | ObjectId | { _id?: string | ObjectId }
) => {
  return Boolean(a && b && ((a as any)._id || a).toString() === ((b as any)._id || b).toString())
}
