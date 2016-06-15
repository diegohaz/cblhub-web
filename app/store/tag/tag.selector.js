import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './tag.schema'

const getEntities = (state) => state.entities
const getItems = (state) => state.tag.items

export const getTags = createSelector(getEntities, getItems, (entities, tags) => {
  return tags.map((id) => denormalize(entities.tags[id], entities, schema))
})

export const getSortedTags = createSelector(getTags, (tags) => {
  return tags.sort((a, b) => a.count - b.count)
})
