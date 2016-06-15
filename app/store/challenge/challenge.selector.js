import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './challenge.schema'

const getEntities = (state) => state.entities
const getItem = (state) => state.challenge.item
const getItems = (state) => state.challenge.items

export const getChallenge = createSelector(getEntities, getItem, (entities, challenge) => {
  return denormalize(entities.challenges[challenge], entities, schema)
})

export const getChallenges = createSelector(getEntities, getItems, (entities, challenges) => {
  return challenges.map((id) => denormalize(entities.challenges[id], entities, schema))
})
