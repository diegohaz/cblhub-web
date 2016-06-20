import { CREATE_SESSION_SUCCESS, REMOVE_SESSION_REQUEST } from './session.actions'

const initialState = {
  token: null
}

export const getToken = (state = initialState) => state.token

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        token: action.token
      }
    case REMOVE_SESSION_REQUEST:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}
