import cookie from 'react-cookie'
import { fromStatus, fromSession } from '../'
import { removeMe } from '../user/user.actions'

export const CREATE_SESSION = 'CREATE_SESSION'
export const CREATE_SESSION_REQUEST = 'CREATE_SESSION_REQUEST'
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS'
export const CREATE_SESSION_FAILURE = 'CREATE_SESSION_FAILURE'
export const REMOVE_SESSION = 'REMOVE_SESSION'
export const REMOVE_SESSION_REQUEST = 'REMOVE_SESSION_REQUEST'
export const REMOVE_SESSION_SUCCESS = 'REMOVE_SESSION_SUCCESS'
export const REMOVE_SESSION_FAILURE = 'REMOVE_SESSION_FAILURE'

export const createSession = (username, password) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), CREATE_SESSION)) {
    return Promise.resolve()
  }
  const dispatchSession = (token) => {
    if (api && api.defaults && api.defaults.headers && api.defaults.headers.common) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    dispatch({ type: CREATE_SESSION_SUCCESS, token })
    cookie.save('token', token)
    return Promise.resolve({ token })
  }

  dispatch({ type: CREATE_SESSION_REQUEST })

  if (fromSession.getToken(getState())) {
    return dispatchSession(fromSession.getToken(getState()))
  }

  return api.post('/sessions', {}, { auth: { username, password } }).then(({ data }) => {
    return dispatchSession(data.token)
  }).catch((error) => {
    dispatch({ type: CREATE_SESSION_FAILURE })
    throw error
  })
}

export const removeSession = (token) => (dispatch, getState, api) => {
  if (fromStatus.getIsLoading(getState(), REMOVE_SESSION)) {
    return Promise.resolve()
  }
  if (typeof token === 'undefined') {
    token = fromSession.getToken(getState())
  }

  dispatch({ type: REMOVE_SESSION_REQUEST })
  dispatch(removeMe())
  cookie.remove('token')

  return api.delete(`/sessions/${token}`).then(({ data }) => {
    dispatch({ type: REMOVE_SESSION_SUCCESS })

    if (api && api.defaults && api.defaults.headers && api.defaults.headers.common) {
      api.defaults.headers.common['Authorization'] = undefined
    }

    return data
  }).catch((error) => {
    dispatch({ type: REMOVE_SESSION_FAILURE })
    throw error
  })
}
