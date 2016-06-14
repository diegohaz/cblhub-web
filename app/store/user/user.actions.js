import { normalize } from 'normalizr'
import user from './user.schema'

export const REQUEST_USER = 'REQUEST_USER'
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS'
export const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE'
export const REQUEST_ME = 'REQUEST_ME'
export const REQUEST_ME_SUCCESS = 'REQUEST_ME_SUCCESS'
export const REQUEST_ME_FAILURE = 'REQUEST_ME_FAILURE'
export const UPDATE_ME = 'UPDATE_ME'

export const getUser = (id) => (dispatch, getState, api) => {
  const { entities } = getState()
  if (entities && entities.users && entities.users[id]) {
    dispatch({
      type: REQUEST_USER_SUCCESS,
      result: id,
      cached: true
    })
  } else {
    dispatch({ type: REQUEST_USER, id })
  }
  return api.get(`/users/${id}`).then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: REQUEST_USER_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: REQUEST_USER_FAILURE })
    throw error
  })
}

export const getMe = () => (dispatch, getState, api) => {
  dispatch({ type: REQUEST_ME })
  return api.get('/users/me').then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: REQUEST_ME_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: REQUEST_ME_FAILURE })
    throw error
  })
}

// export const getMe = () =>
//   getUser('me').catch((error) => {
//     if (error.status === 401) {
//       dispatch(removeSession())
//         .catch(() => dispatch(createAnonymousSession()))
//         .then(() => dispatch(getMe()))
//     }
//     throw error
//   })

export const updateMe = (body) => (dispatch, getState, api) => {
  const { result, entities } = normalize(body, user)
  dispatch({ type: UPDATE_ME, result, entities })

  return api.put('/users/me', { ...body }).then(({ data }) => {
    const { result, entities } = normalize(data, user)
    dispatch({ type: REQUEST_ME_SUCCESS, result, entities })
    return data
  }).catch((error) => {
    dispatch({ type: REQUEST_ME_FAILURE })
    throw error
  })
}
