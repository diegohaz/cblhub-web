import { arrayOf, normalize } from 'normalizr'
import schema from './guide.schema'
import { getChallenge } from '../challenge/challenge.selector'
import { getMe, getUser } from '../user/user.selector'
import { getGuide } from './guide.selector'

export const FETCH_GUIDES = 'FETCH_GUIDES'
export const FETCH_GUIDES_SUCCESS = 'FETCH_GUIDES_SUCCESS'
export const FETCH_GUIDES_FAILURE = 'FETCH_GUIDES_FAILURE'
export const FETCH_GUIDE = 'FETCH_GUIDE'
export const FETCH_GUIDE_SUCCESS = 'FETCH_GUIDE_SUCCESS'
export const FETCH_GUIDE_FAILURE = 'FETCH_GUIDE_FAILURE'
export const CREATE_GUIDE = 'CREATE_GUIDE'
export const CREATE_GUIDE_SUCCESS = 'CREATE_GUIDE_SUCCESS'
export const CREATE_GUIDE_FAILURE = 'CREATE_GUIDE_FAILURE'
export const UPDATE_GUIDE = 'UPDATE_GUIDE'
export const UPDATE_GUIDE_SUCCESS = 'UPDATE_GUIDE_SUCCESS'
export const UPDATE_GUIDE_FAILURE = 'UPDATE_GUIDE_FAILURE'
export const REMOVE_GUIDE = 'REMOVE_GUIDE'
export const REMOVE_GUIDE_SUCCESS = 'REMOVE_GUIDE_SUCCESS'
export const REMOVE_GUIDE_FAILURE = 'REMOVE_GUIDE_FAILURE'

export const fetchGuides = (
  { ...params, q, user, challenge, guide, type, page, limit, sort } = {},
  append = page > 1
) => (dispatch, getState, api) => {
  dispatch({ type: FETCH_GUIDES, params })
  return api.get('/guides', { params }).then(({ data }) => {
    const { result, entities } = normalize(data, arrayOf(schema))
    dispatch({ type: FETCH_GUIDES_SUCCESS, result, append, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_GUIDES_FAILURE })
    throw error
  })
}

export const fetchChallengeGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ challenge: getChallenge(getState()).id, ...params }))

export const fetchGuideGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ guide: getGuide(getState()).id, ...params }))

export const fetchUserGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ user: getUser(getState()).id, ...params }))

export const fetchMyGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ user: getMe(getState()).id, ...params }))

export const fetchGuide = (id) => (dispatch, getState, api) => {
  const { entities } = getState()
  if (entities && entities.guides && entities.guides[id]) {
    dispatch({
      type: FETCH_GUIDE_SUCCESS,
      result: id,
      cached: true
    })
  } else {
    dispatch({ type: FETCH_GUIDE, id })
  }
  return api.get(`/guides/${id}`).then(({ data }) => {
    const { result, entities } = normalize(data, schema)
    dispatch({ type: FETCH_GUIDE_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_GUIDE_FAILURE })
    throw error
  })
}

export const createGuide = (body) => (dispatch, getState, api) => {
  dispatch({ type: CREATE_GUIDE })
  return api.post('/guides', body).then(({ data }) => {
    const { result, entities } = normalize(data, schema)
    dispatch({ type: CREATE_GUIDE_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: CREATE_GUIDE_FAILURE })
    throw error
  })
}

export const updateGuide = (body) => (dispatch, getState, api) => {
  const { entities } = getState()
  let oldEntity
  if (entities && entities.guides && entities.guides[body.id]) {
    oldEntity = entities.guides[body.id]
  }
  dispatch({
    type: UPDATE_GUIDE,
    entities: normalize(body, schema).entities
  })

  return api.put(`/guides/${body.id}`, {...body}).then(({ data }) => {
    const { entities } = normalize(data, schema)
    dispatch({ type: UPDATE_GUIDE_SUCCESS, entities })
    return data
  }).catch((error) => {
    const { entities } = normalize(oldEntity, schema)
    dispatch({ type: UPDATE_GUIDE_FAILURE, entities })
    throw error
  })
}

export const removeGuide = (id) => (dispatch, getState, api) => {
  dispatch({ type: REMOVE_GUIDE, id })
  return api.delete(`/guides/${id}`).then(() => {
    dispatch({ type: REMOVE_GUIDE_SUCCESS, id })
  }).catch((error) => {
    dispatch({ type: REMOVE_GUIDE_FAILURE, id })
    throw error
  })
}
