import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './user.schema'

const getEntities = (state) => state.entities
const getCurrent = (state) => state.user.me
const getItem = (state) => state.user.item

export const getMe = createSelector(getEntities, getCurrent, (entities, user) => {
  return denormalize(entities.users[user], entities, schema)
})

export const getUser = createSelector(getEntities, getItem, (entities, user) => {
  return denormalize(entities.users[user], entities, schema)
})
