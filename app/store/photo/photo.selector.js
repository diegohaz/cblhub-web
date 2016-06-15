import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import schema from './photo.schema'

const getEntities = (state) => state.entities
const getItems = (state) => state.photo.items

export const getPhotos = createSelector(getEntities, getItems, (entities, photos) => {
  return photos.map((id) => denormalize(entities.photos[id], entities, schema))
})
