import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './guide.schema'

const getEntities = (state) => state.entities
const getItem = (state) => state.guide.item
const getItems = (state) => state.guide.items

export const getGuide = createSelector(getEntities, getItem, (entities, guide) => {
  return denormalize(entities.guides[guide], entities, schema)
})

export const getGuides = createSelector(getEntities, getItems, (entities, guides) => {
  return guides.map((id) => denormalize(entities.guides[id], entities, schema))
})
