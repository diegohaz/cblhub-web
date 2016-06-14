import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import challenge from './challenge/challenge.reducer'

const initialState = {
  activities: {},
  challenges: {},
  photos: {},
  questions: {},
  resources: {},
  users: {}
}

function entities (state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities)
  }
  return state
}

const reducers = combineReducers({
  entities,
  challenge
})

export default reducers
