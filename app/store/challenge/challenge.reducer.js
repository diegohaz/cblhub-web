import {
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  REMOVE_CHALLENGE_REQUEST,
  REMOVE_CHALLENGE_SUCCESS,
  REMOVE_CHALLENGE_FAILURE
} from './challenge.actions'

const initialState = {
  active: null,
  list: [],
  removeIndex: -1
}

export const getActiveId = (state = initialState) => state.active
export const getListIds = (state = initialState) => state.list || []

export default function challengeReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHALLENGES_SUCCESS:
      return {
        ...state,
        list: action.append ? [ ...state.list, ...action.result ] : action.result
      }
    case FETCH_CHALLENGE_REQUEST:
      return {
        ...state,
        active: action.id
      }
    case FETCH_CHALLENGE_SUCCESS:
      return {
        ...state,
        active: action.result
      }
    default:
      return removeChallengeReducer(state, action)
  }
}

function removeChallengeReducer (state = initialState, action) {
  const idx = state.list.indexOf(action.id)

  switch (action.type) {
    case REMOVE_CHALLENGE_REQUEST:
      return {
        ...state,
        list: ~idx ? [ ...state.list.slice(0, idx), ...state.list.slice(idx + 1) ] : state.list,
        removeIndex: idx
      }
    case REMOVE_CHALLENGE_SUCCESS:
      return {
        ...state,
        removeIndex: -1
      }
    case REMOVE_CHALLENGE_FAILURE:
      return {
        ...state,
        list: [
          ...state.list.slice(0, state.removeIndex),
          action.id,
          ...state.list.slice(state.removeIndex)
        ],
        removeIndex: -1
      }
    default:
      return state
  }
}
