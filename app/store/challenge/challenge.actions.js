import { arrayOf, normalize } from 'normalizr'
import challenge from './challenge.schema'

export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES'
export const REQUEST_CHALLENGES_SUCCESS = 'REQUEST_CHALLENGES_SUCCESS'
export const REQUEST_CHALLENGES_FAILURE = 'REQUEST_CHALLENGES_FAILURE'
export const CREATE_CHALLENGE = 'CREATE_CHALLENGE'
export const CREATE_CHALLENGE_SUCCESS = 'CREATE_CHALLENGE_SUCCESS'
export const CREATE_CHALLENGE_FAILURE = 'CREATE_CHALLENGE_FAILURE'
export const REQUEST_CHALLENGE = 'REQUEST_CHALLENGE'
export const REQUEST_CHALLENGE_SUCCESS = 'REQUEST_CHALLENGE_SUCCESS'
export const REQUEST_CHALLENGE_FAILURE = 'REQUEST_CHALLENGE_FAILURE'
export const REMOVE_CHALLENGE = 'REMOVE_CHALLENGE'
export const REMOVE_CHALLENGE_SUCCESS = 'REMOVE_CHALLENGE_SUCCESS'
export const REMOVE_CHALLENGE_FAILURE = 'REMOVE_CHALLENGE_FAILURE'

export const getChallenges = ({
  ...params,
  q,
  user,
  page,
  limit,
  sort
} = {}, append = page > 1) => (dispatch, getState, api) => {
  dispatch({ type: REQUEST_CHALLENGES, params })
  return api.get('/challenges', { params }).then(({ data }) => {
    const { result, entities } = normalize(data, arrayOf(challenge))
    dispatch({ type: REQUEST_CHALLENGES_SUCCESS, result, append, entities })
    return data
  }).catch((error) => {
    dispatch({ type: REQUEST_CHALLENGES_FAILURE, error })
    throw error
  })
}

export const getChallenge = (id) => (dispatch, getState, api) => {
  const { entities } = getState()
  if (entities && entities.challenges && entities.challenges[id]) {
    dispatch({
      type: REQUEST_CHALLENGE_SUCCESS,
      result: id,
      cached: true
    })
  } else {
    dispatch({ type: REQUEST_CHALLENGE, id })
  }
  return api.get(`/challenges/${id}`).then(({ data }) => {
    const { result, entities } = normalize(data, challenge)
    dispatch({ type: REQUEST_CHALLENGE_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: REQUEST_CHALLENGE_FAILURE, error })
    throw error
  })
}

export const createChallenge = (body) => (dispatch, getState, api) => {
  dispatch({ type: CREATE_CHALLENGE })
  return api.post('/challenges', body).then(({ data }) => {
    const { result, entities } = normalize(data, challenge)
    dispatch({ type: CREATE_CHALLENGE_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: CREATE_CHALLENGE_FAILURE, error })
    throw error
  })
}

export const removeChallenge = (id) => (dispatch, getState, api) => {
  dispatch({ type: REMOVE_CHALLENGE, id })
  return api.remove(`/challenges/${id}`).then(() => {
    dispatch({ type: REMOVE_CHALLENGE_SUCCESS, id })
  }).catch((error) => {
    dispatch({ type: REMOVE_CHALLENGE_FAILURE, error, id })
    throw error
  })
}
