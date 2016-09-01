import { fromStatus } from '../'
import { baseUrl } from '../../config'

export const CREATE_PASSWORD_RESET = 'CREATE_PASSWORD_RESET'
export const CREATE_PASSWORD_RESET_REQUEST = 'CREATE_PASSWORD_RESET_REQUEST'
export const CREATE_PASSWORD_RESET_SUCCESS = 'CREATE_PASSWORD_RESET_SUCCESS'
export const CREATE_PASSWORD_RESET_FAILURE = 'CREATE_PASSWORD_RESET_FAILURE'
export const FETCH_PASSWORD_RESET = 'FETCH_PASSWORD_RESET'
export const FETCH_PASSWORD_RESET_REQUEST = 'FETCH_PASSWORD_RESET_REQUEST'
export const FETCH_PASSWORD_RESET_SUCCESS = 'FETCH_PASSWORD_RESET_SUCCESS'
export const FETCH_PASSWORD_RESET_FAILURE = 'FETCH_PASSWORD_RESET_FAILURE'
export const UPDATE_PASSWORD_RESET = 'UPDATE_PASSWORD_RESET'
export const UPDATE_PASSWORD_RESET_REQUEST = 'UPDATE_PASSWORD_RESET_REQUEST'
export const UPDATE_PASSWORD_RESET_SUCCESS = 'UPDATE_PASSWORD_RESET_SUCCESS'
export const UPDATE_PASSWORD_RESET_FAILURE = 'UPDATE_PASSWORD_RESET_FAILURE'

export const createPasswordReset = (email) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), CREATE_PASSWORD_RESET)) {
    return Promise.resolve()
  }
  dispatch({ type: CREATE_PASSWORD_RESET_REQUEST })
  const link = `${baseUrl}/reset-password`
  return api.post('/password-resets', { email, link }).then(({ data }) => {
    dispatch({ type: CREATE_PASSWORD_RESET_SUCCESS })
    return data
  }).catch((error) => {
    dispatch({ type: CREATE_PASSWORD_RESET_FAILURE })
    throw error
  })
}

export const fetchPasswordReset = (token) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), FETCH_PASSWORD_RESET)) {
    return Promise.resolve()
  }
  dispatch({ type: FETCH_PASSWORD_RESET_REQUEST })
  return api.get(`/password-resets/${token}`).then(({ data }) => {
    dispatch({ type: FETCH_PASSWORD_RESET_SUCCESS })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_PASSWORD_RESET_FAILURE })
    throw error
  })
}

export const updatePasswordReset = (token, { password }) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), UPDATE_PASSWORD_RESET)) {
    return Promise.resolve()
  }
  dispatch({ type: UPDATE_PASSWORD_RESET_REQUEST })
  return api.put(`/password-resets/${token}`, { password }).then(({ data }) => {
    dispatch({ type: UPDATE_PASSWORD_RESET_SUCCESS })
    return data
  }).catch((error) => {
    dispatch({ type: UPDATE_PASSWORD_RESET_FAILURE })
    throw error
  })
}
