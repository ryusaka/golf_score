import * as dotenv from 'dotenv'
dotenv.config()
import * as config from 'config'
import * as mongoose from 'mongoose'
mongoose.Promise = global.Promise

const promise = () => mongoose.connect(config.get('mongodb.uri'), config.get('mongodb.options'))
export default promise