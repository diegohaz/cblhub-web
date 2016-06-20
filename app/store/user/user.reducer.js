import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_ME_SUCCESS,
  REMOVE_ME
} from './user.actions'

const initialState = {
  active: null,
  current: null
}

export const getActiveId = (state = initialState) => state.active
export const getCurrentId = (state = initialState) => state.current

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        active: action.id
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        active: action.result
      }
    case FETCH_ME_SUCCESS:
      return {
        ...state,
        current: action.result
      }
    case REMOVE_ME:
      return {
        ...state,
        current: null
      }
    default:
      return state
  }
}
