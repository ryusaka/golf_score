import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import score from 'modules/score'
import field from 'modules/field'
import player from 'modules/player'

export default (history) => combineReducers({
  router: connectRouter(history),
  score,
  field,
  player,
})
