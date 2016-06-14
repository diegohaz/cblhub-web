import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './challenge.schema'

const getState = (state) => state

export const getChallenge = createSelector(getState, ({ entities, challenge }) => {
  return denormalize(entities.challenges[challenge.item], entities, schema)
})

export const getChallenges = createSelector(getState, ({ entities, challenge }) => {
  return challenge.items.map((id) => denormalize(entities.challenges[id], entities, schema))
})
