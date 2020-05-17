import axios from 'axios'
import thunk from 'redux-thunk'

export const client = axios.create({withCredentials: true})
export const internalClient = axios.create({
  baseURL: 'http://localhost:11111',
})
export const thunkWithClient = thunk.withExtraArgument(client)
