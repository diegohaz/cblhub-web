import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './user.schema'

const getState = (state) => state

export const getMe = createSelector(getState, ({ entities, user }) => {
  return denormalize(entities.users[user.me], entities, schema)
})

export const getUser = createSelector(getState, ({ entities, user }) => {
  return denormalize(entities.users[user.item], entities, schema)
})
