import { arrayOf, normalize } from 'normalizr'
import tag from './tag.schema'

export const FETCH_TAGS = 'FETCH_TAGS'
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE'
export const FETCH_TAG = 'FETCH_TAG'
export const FETCH_TAG_SUCCESS = 'FETCH_TAG_SUCCESS'
export const FETCH_TAG_FAILURE = 'FETCH_TAG_FAILURE'

export const fetchTags = ({
  ...params,
  q,
  page,
  limit,
  sort
} = {}, append = page > 1) => (dispatch, getState, api) => {
  dispatch({ type: FETCH_TAGS, params })
  return api.get('/tags', { params }).then(({ data }) => {
    const { result, entities } = normalize(data, arrayOf(tag))
    dispatch({ type: FETCH_TAGS_SUCCESS, result, append, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_TAGS_FAILURE })
    throw error
  })
}

export const fetchTagsByCount = ({ ...params, limit = 1000, sort = 'count' } = {}) =>
  fetchTags({ ...params, limit, sort })

export const fetchTag = (id) => (dispatch, getState, api) => {
  const { entities } = getState()
  if (entities && entities.tags && entities.tags[id]) {
    dispatch({
      type: FETCH_TAG_SUCCESS,
      result: id,
      cached: true
    })
  } else {
    dispatch({ type: FETCH_TAG, id })
  }
  return api.get(`/tags/${id}`).then(({ data }) => {
    const { result, entities } = normalize(data, tag)
    dispatch({ type: FETCH_TAG_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_TAG_FAILURE })
    throw error
  })
}