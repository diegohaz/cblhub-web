import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_ME,
  FETCH_ME_SUCCESS,
  FETCH_ME_FAILURE,
  UPDATE_ME,
  REMOVE_ME
} from './user.actions'

const initialState = {
  item: null,
  me: null,
  loading: {
    me: false,
    item: false
  },
  error: {
    me: false,
    item: false
  }
}

export const getCurrentId = (state = {}) => state.item
export const getMyId = (state = {}) => state.me
export const getLoading = (state = {}) => state.loading || {}
export const getIsFetchingCurrentId = (state) => getLoading(state).item
export const getIsFetchingMe = (state) => getLoading(state).me
export const getError = (state = {}) => state.error || {}
export const getCurrentIdFailed = (state) => getError(state).item
export const getMeFailed = (state) => getError(state).me

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: { ...state.loading, item: true },
        error: { ...state.error, item: false }
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: { ...state.loading, item: !!action.cached }
      }
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, item: false },
        error: { ...state.error, item: true }
      }

    case FETCH_ME:
      return {
        ...state,
        loading: { ...state.loading, me: true },
        error: { ...state.error, me: false }
      }
    case FETCH_ME_SUCCESS:
      return {
        ...state,
        me: action.result,
        loading: { ...state.loading, me: false }
      }
    case FETCH_ME_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, me: false },
        error: { ...state.error, me: true }
      }
    case UPDATE_ME:
      return {
        ...state,
        me: action.result,
        loading: { ...state.loading, me: true },
        error: { ...state.error, me: false }
      }
    case REMOVE_ME:
      return {
        ...state,
        me: null
      }
    default:
      return state
  }
}
