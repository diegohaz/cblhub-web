import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import challenge from './challenge/challenge.reducer'
import guide from './guide/guide.reducer'
import photo from './photo/photo.reducer'
import session from './session/session.reducer'
import tag from './tag/tag.reducer'
import user from './user/user.reducer'

const initialState = {
  challenges: {},
  guides: {},
  photos: {},
  tags: {},
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
  challenge,
  guide,
  photo,
  session,
  tag,
  user
})

export default reducers
