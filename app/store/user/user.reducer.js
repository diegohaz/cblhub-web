import {
  REQUEST_USER,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE,
  REQUEST_ME,
  REQUEST_ME_SUCCESS,
  REQUEST_ME_FAILURE,
  UPDATE_ME
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

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: { ...state.loading, item: true },
        error: { ...state.error, item: false }
      }
    case REQUEST_USER_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: { ...state.loading, item: !!action.cached }
      }
    case REQUEST_USER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, item: false },
        error: { ...state.error, item: true }
      }

    case REQUEST_ME:
      return {
        ...state,
        loading: { ...state.loading, me: true },
        error: { ...state.error, me: false }
      }
    case REQUEST_ME_SUCCESS:
      return {
        ...state,
        me: action.result,
        loading: { ...state.loading, me: false }
      }
    case REQUEST_ME_FAILURE:
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
    default:
      return state
  }
}
