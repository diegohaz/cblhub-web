import { arrayOf, normalize } from 'normalizr'
import photo from './photo.schema'

export const SEARCH_PHOTOS = 'SEARCH_PHOTOS'
export const SEARCH_PHOTOS_REQUEST = 'SEARCH_PHOTOS_REQUEST'
export const SEARCH_PHOTOS_SUCCESS = 'SEARCH_PHOTOS_SUCCESS'
export const SEARCH_PHOTOS_FAILURE = 'SEARCH_PHOTOS_FAILURE'
export const SELECT_PHOTO = 'SELECT_PHOTO'
export const DESELECT_PHOTO = 'DESELECT_PHOTO'

export const searchPhotos = ({ q, limit = 20 }) => (dispatch, getState, api) => {
  dispatch({ type: SEARCH_PHOTOS_REQUEST, params: { q, limit } })
  return api.get('/photos/search', { params: { q, limit } }).then(({ data }) => {
    const { result, entities } = normalize(data, arrayOf(photo))
    dispatch({ type: SEARCH_PHOTOS_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: SEARCH_PHOTOS_FAILURE })
    throw error
  })
}

export const selectPhoto = (id) => ({
  type: SELECT_PHOTO,
  id
})

export const deselectPhoto = () => ({
  type: DESELECT_PHOTO
})
