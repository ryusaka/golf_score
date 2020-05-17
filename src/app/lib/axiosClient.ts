import axios from 'axios'
import thunk from 'redux-thunk'

export const client = axios.create({ withCredentials: true })
export const internalClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3232' : 'http://localhost:11111',
})
export const thunkWithClient = thunk.withExtraArgument(client)
