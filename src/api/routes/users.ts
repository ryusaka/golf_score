import { User } from '../models'
import { ObjectId, MongoError } from 'mongodb'

const login = async (req, res) => {
  if (req.user) return show(req, res)

  const user = await User.findOne({ userId: req.body.userId }).lean()

  if (!user) return res.status(404).json({ message: 'not found' })
  if (!(await User.verify(user._id, req.body.password))) {
    return res.status(401).json({ message: 'unauthorized' })
  }

  return res.json({ user })
}

const signUp = async (req, res) => {
  const { name, userId, password } = req.body

  const id = new ObjectId()
  try {
    const user = await User.create({
      name,
      userId,
      token: User.generateToken(),
      password: User.cipher(id.toHexString(), password),
      _id: id,
    })
    return res.json({ user })
  } catch (e) {
    if (e instanceof MongoError) {
      // duplication
      if (e.code === 11000) {
        return res.status(400).json({ message: 'duplicate userId' })
      }
    }
    console.error(e)
    return res.status(400).json({ message: 'bad request' })
  }
}

const show = async (req, res) => {
  return res.json({ user: req.user })
}

export { login, signUp, show }
