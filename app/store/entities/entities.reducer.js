import merge from 'lodash/merge'

const initialState = {
  challenges: {},
  guides: {},
  photos: {},
  tags: {},
  users: {}
}

export const getChallenges = (state = initialState) => state.challenges || {}
export const getChallenge = (state, id) => getChallenges(state)[id]
export const getGuides = (state = initialState) => state.guides || {}
export const getGuide = (state, id) => getGuides(state)[id]
export const getPhotos = (state = initialState) => state.photos || {}
export const getPhoto = (state, id) => getPhotos(state)[id]
export const getTags = (state = initialState) => state.tags || {}
export const getTag = (state, id) => getTags(state)[id]
export const getUsers = (state = initialState) => state.users || {}
export const getUser = (state, id) => getUsers(state)[id]

export default function entitiesReducer (state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities)
  }
  return state
}
