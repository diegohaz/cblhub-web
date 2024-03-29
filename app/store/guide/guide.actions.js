import { arrayOf, normalize } from 'normalizr'
import schema from './guide.schema'
import { fromEntities, fromChallenge, fromUser, fromGuide, fromStatus } from '../'

export const FETCH_GUIDES = 'FETCH_GUIDES'
export const FETCH_GUIDES_REQUEST = 'FETCH_GUIDES_REQUEST'
export const FETCH_GUIDES_SUCCESS = 'FETCH_GUIDES_SUCCESS'
export const FETCH_GUIDES_FAILURE = 'FETCH_GUIDES_FAILURE'
export const FETCH_GUIDE = 'FETCH_GUIDE'
export const FETCH_GUIDE_REQUEST = 'FETCH_GUIDE_REQUEST'
export const FETCH_GUIDE_SUCCESS = 'FETCH_GUIDE_SUCCESS'
export const FETCH_GUIDE_FAILURE = 'FETCH_GUIDE_FAILURE'
export const CREATE_GUIDE = 'CREATE_GUIDE'
export const CREATE_GUIDE_REQUEST = 'CREATE_GUIDE_REQUEST'
export const CREATE_GUIDE_SUCCESS = 'CREATE_GUIDE_SUCCESS'
export const CREATE_GUIDE_FAILURE = 'CREATE_GUIDE_FAILURE'
export const UPDATE_GUIDE = 'UPDATE_GUIDE'
export const UPDATE_GUIDE_REQUEST = 'UPDATE_GUIDE_REQUEST'
export const UPDATE_GUIDE_SUCCESS = 'UPDATE_GUIDE_SUCCESS'
export const UPDATE_GUIDE_FAILURE = 'UPDATE_GUIDE_FAILURE'
export const REMOVE_GUIDE = 'REMOVE_GUIDE'
export const REMOVE_GUIDE_REQUEST = 'REMOVE_GUIDE_REQUEST'
export const REMOVE_GUIDE_SUCCESS = 'REMOVE_GUIDE_SUCCESS'
export const REMOVE_GUIDE_FAILURE = 'REMOVE_GUIDE_FAILURE'

export const fetchGuides = (
  { ...params, q, user, challenge, guide, type, page, limit, sort } = {},
  append = page > 1
) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), FETCH_GUIDES)) {
    return Promise.resolve()
  }
  dispatch({ type: FETCH_GUIDES_REQUEST, params })
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
  dispatch(fetchGuides({ challenge: fromChallenge.getActiveId(getState()), ...params }))

export const fetchGuideGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ guide: fromGuide.getActiveId(getState()), ...params }))

export const fetchUserGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ user: fromUser.getActiveId(getState()), ...params }))

export const fetchMyGuides = (params = {}) => (dispatch, getState) =>
  dispatch(fetchGuides({ user: fromUser.getCurrentId(getState()), ...params }))

export const fetchGuide = (id) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), FETCH_GUIDE)) {
    return Promise.resolve()
  }
  dispatch({ type: FETCH_GUIDE_REQUEST, id })
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
  if (fromStatus.getIsLoading(getState(), CREATE_GUIDE)) {
    return Promise.resolve()
  }
  dispatch({ type: CREATE_GUIDE_REQUEST })
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
  if (fromStatus.getIsLoading(getState(), UPDATE_GUIDE)) {
    return Promise.resolve()
  }
  const oldEntity = fromEntities.getGuide(getState(), body.id)
  dispatch({
    type: UPDATE_GUIDE_REQUEST,
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
  if (fromStatus.getIsLoading(getState(), REMOVE_GUIDE)) {
    return Promise.resolve()
  }
  dispatch({ type: REMOVE_GUIDE_REQUEST, id })
  return api.delete(`/guides/${id}`).then(() => {
    dispatch({ type: REMOVE_GUIDE_SUCCESS, id })
  }).catch((error) => {
    dispatch({ type: REMOVE_GUIDE_FAILURE, id })
    throw error
  })
}
