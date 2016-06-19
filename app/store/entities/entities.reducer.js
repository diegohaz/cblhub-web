import merge from 'lodash/merge'

const initialState = {
  challenges: {},
  guides: {},
  photos: {},
  tags: {},
  users: {}
}

export const getChallenges = (state = {}) => state.challenges || {}
export const getChallenge = (state, id) => getChallenges(state)[id]
export const getGuides = (state = {}) => state.guides || {}
export const getGuide = (state, id) => getGuides(state)[id]
export const getPhotos = (state = {}) => state.photos || {}
export const getPhoto = (state, id) => getPhotos(state)[id]
export const getTags = (state = {}) => state.tags || {}
export const getTag = (state, id) => getTags(state)[id]
export const getUsers = (state = {}) => state.users || {}
export const getUser = (state, id) => getUsers(state)[id]

export default function entities (state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities)
  }
  return state
}
