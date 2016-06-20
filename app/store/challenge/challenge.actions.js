import { arrayOf, normalize } from 'normalizr'
import { fromEntities } from '../'
import { deselectPhoto } from '../photo/photo.actions'
import challenge from './challenge.schema'

export const FETCH_CHALLENGES = 'FETCH_CHALLENGES'
export const FETCH_CHALLENGES_REQUEST = 'FETCH_CHALLENGES_REQUEST'
export const FETCH_CHALLENGES_SUCCESS = 'FETCH_CHALLENGES_SUCCESS'
export const FETCH_CHALLENGES_FAILURE = 'FETCH_CHALLENGES_FAILURE'
export const FETCH_CHALLENGE = 'FETCH_CHALLENGE'
export const FETCH_CHALLENGE_REQUEST = 'FETCH_CHALLENGE_REQUEST'
export const FETCH_CHALLENGE_SUCCESS = 'FETCH_CHALLENGE_SUCCESS'
export const FETCH_CHALLENGE_FAILURE = 'FETCH_CHALLENGE_FAILURE'
export const CREATE_CHALLENGE = 'CREATE_CHALLENGE'
export const CREATE_CHALLENGE_REQUEST = 'CREATE_CHALLENGE_REQUEST'
export const CREATE_CHALLENGE_SUCCESS = 'CREATE_CHALLENGE_SUCCESS'
export const CREATE_CHALLENGE_FAILURE = 'CREATE_CHALLENGE_FAILURE'
export const UPDATE_CHALLENGE = 'UPDATE_CHALLENGE'
export const UPDATE_CHALLENGE_REQUEST = 'UPDATE_CHALLENGE_REQUEST'
export const UPDATE_CHALLENGE_SUCCESS = 'UPDATE_CHALLENGE_SUCCESS'
export const UPDATE_CHALLENGE_FAILURE = 'UPDATE_CHALLENGE_FAILURE'
export const REMOVE_CHALLENGE = 'REMOVE_CHALLENGE'
export const REMOVE_CHALLENGE_REQUEST = 'REMOVE_CHALLENGE_REQUEST'
export const REMOVE_CHALLENGE_SUCCESS = 'REMOVE_CHALLENGE_SUCCESS'
export const REMOVE_CHALLENGE_FAILURE = 'REMOVE_CHALLENGE_FAILURE'

export const fetchChallenges = (
  { ...params, q, user, page, limit, sort } = {},
  append = page > 1
) => (dispatch, getState, api) => {
  dispatch({ type: FETCH_CHALLENGES_REQUEST, params })
  return api.get('/challenges', { params }).then(({ data }) => {
    const { result, entities } = normalize(data, arrayOf(challenge))
    dispatch({ type: FETCH_CHALLENGES_SUCCESS, result, append, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_CHALLENGES_FAILURE })
    throw error
  })
}

export const fetchChallenge = (id) => (dispatch, getState, api) => {
  dispatch({ type: FETCH_CHALLENGE_REQUEST, id })
  return api.get(`/challenges/${id}`).then(({ data }) => {
    const { result, entities } = normalize(data, challenge)
    dispatch({ type: FETCH_CHALLENGE_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_CHALLENGE_FAILURE })
    throw error
  })
}

export const createChallenge = (body) => (dispatch, getState, api) => {
  dispatch({ type: CREATE_CHALLENGE_REQUEST })
  return api.post('/challenges', body).then(({ data }) => {
    const { result, entities } = normalize(data, challenge)
    dispatch({ type: CREATE_CHALLENGE_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: CREATE_CHALLENGE_FAILURE })
    throw error
  })
}

export const updateChallenge = (body) => (dispatch, getState, api) => {
  const oldEntity = fromEntities.getChallenge(getState(), body.id)
  dispatch({
    type: UPDATE_CHALLENGE_REQUEST,
    entities: normalize(body, challenge).entities
  })

  return api.put(`/challenges/${body.id}`, {...body}).then(({ data }) => {
    const { entities } = normalize(data, challenge)
    dispatch({ type: UPDATE_CHALLENGE_SUCCESS, entities })
    dispatch(deselectPhoto())
    return data
  }).catch((error) => {
    const { entities } = normalize(oldEntity, challenge)
    dispatch({ type: UPDATE_CHALLENGE_FAILURE, entities })
    dispatch(deselectPhoto(body.id))
    throw error
  })
}

export const removeChallenge = (id) => (dispatch, getState, api) => {
  dispatch({ type: REMOVE_CHALLENGE_REQUEST, id })
  return api.delete(`/challenges/${id}`).then(() => {
    dispatch({ type: REMOVE_CHALLENGE_SUCCESS, id })
  }).catch((error) => {
    dispatch({ type: REMOVE_CHALLENGE_FAILURE, id })
    throw error
  })
}
