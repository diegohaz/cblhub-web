import { normalize } from 'normalizr'
import { fromStatus } from '../'
import user from './user.schema'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
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
  if (fromStatus.getIsLoading(getState(), FETCH_USER)) {
    return Promise.resolve()
  }
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
  if (fromStatus.getIsLoading(getState(), FETCH_ME)) {
    return Promise.resolve()
  }
  dispatch({ type: FETCH_ME_REQUEST })
  return api.get('/users/me').then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: FETCH_ME_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_ME_FAILURE })
    if (error.response.status === 401) {
      api.unsetToken()
    }
    throw error
  })
}

export const createUser = (body) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), CREATE_USER)) {
    return Promise.resolve()
  }
  dispatch({ type: CREATE_USER_REQUEST })
  return api.post('/users', body).then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: CREATE_USER_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: CREATE_USER_FAILURE })
    throw error
  })
}

export const updateMe = (body) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), UPDATE_ME)) {
    return Promise.resolve()
  }
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
