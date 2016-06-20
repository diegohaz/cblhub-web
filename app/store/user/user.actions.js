import { normalize } from 'normalizr'
import user from './user.schema'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const FETCH_ME = 'FETCH_ME'
export const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST'
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS'
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE'
export const UPDATE_ME = 'UPDATE_ME'
export const UPDATE_ME_REQUEST = 'UPDATE_ME_REQUEST'
export const UPDATE_ME_SUCCESS = 'UPDATE_ME_SUCCESS'
export const UPDATE_ME_FAILURE = 'UPDATE_ME_FAILURE'
export const REMOVE_ME = 'REMOVE_ME'

export const fetchUser = (id) => (dispatch, getState, api) => {
  dispatch({ type: FETCH_USER_REQUEST, id })
  return api.get(`/users/${id}`).then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: FETCH_USER_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_USER_FAILURE })
    throw error
  })
}

export const fetchMe = () => (dispatch, getState, api) => {
  dispatch({ type: FETCH_ME_REQUEST })
  return api.get('/users/me').then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: FETCH_ME_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_ME_FAILURE })
    throw error
  })
}

export const updateMe = (body) => (dispatch, getState, api) => {
  const { result, entities } = normalize(body, user)
  dispatch({ type: UPDATE_ME_REQUEST, id: result, entities })

  return api.put('/users/me', { ...body }).then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: UPDATE_ME_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: UPDATE_ME_FAILURE })
    throw error
  })
}

export const removeMe = () => ({
  type: REMOVE_ME
})
