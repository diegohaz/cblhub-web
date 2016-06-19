import {
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  REMOVE_SESSION,
  REMOVE_SESSION_SUCCESS,
  REMOVE_SESSION_FAILURE
} from './session.actions'

const initialState = {
  token: null,
  loading: false,
  error: false
}

export const getToken = (state = {}) => state.token
export const getIsLoading = (state = {}) => state.loading
export const getFailed = (state = {}) => state.error

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_SESSION:
      return {
        ...state,
        loading: true,
        error: false
      }
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false
      }
    case CREATE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case REMOVE_SESSION:
      return {
        ...state,
        token: null,
        loading: true,
        error: false
      }
    case REMOVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case REMOVE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}
