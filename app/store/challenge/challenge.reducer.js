import {
  REQUEST_CHALLENGES,
  REQUEST_CHALLENGES_SUCCESS,
  REQUEST_CHALLENGES_FAILURE,
  CREATE_CHALLENGE,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_CHALLENGE_FAILURE,
  REQUEST_CHALLENGE,
  REQUEST_CHALLENGE_SUCCESS,
  REQUEST_CHALLENGE_FAILURE,
  REMOVE_CHALLENGE,
  REMOVE_CHALLENGE_SUCCESS,
  REMOVE_CHALLENGE_FAILURE
} from './challenge.actions'

const initialState = {
  items: [],
  item: null,
  loading: {
    items: false,
    item: false,
    create: false,
    remove: false
  },
  error: {
    items: false,
    item: false,
    create: false,
    remove: false
  }
}

export default function challengeReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_CHALLENGES:
      return {
        ...state,
        loading: { ...state.loading, items: true },
        error: { ...state.error, items: false }
      }
    case REQUEST_CHALLENGES_SUCCESS:
      return {
        ...state,
        items: action.append ? [...state.items, ...action.result] : action.result,
        loading: { ...state.loading, items: false }
      }
    case REQUEST_CHALLENGES_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, items: false },
        erorrs: { items: true }
      }

    case CREATE_CHALLENGE:
      return {
        ...state,
        loading: { ...state.loading, create: true },
        error: { ...state.error, create: false }
      }
    case CREATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, create: false }
      }
    case CREATE_CHALLENGE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, create: false },
        erorrs: { create: true }
      }

    case REQUEST_CHALLENGE:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: { ...state.loading, item: true },
        erors: { item: false }
      }
    case REQUEST_CHALLENGE_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: { ...state.loading, item: action.cached }
      }
    case REQUEST_CHALLENGE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, item: false },
        error: { ...state.error, item: true }
      }

    case REMOVE_CHALLENGE:
    case REMOVE_CHALLENGE_SUCCESS:
    case REMOVE_CHALLENGE_FAILURE:
      return removeBroadcastReducer(state, action)

    default:
      return state
  }
}

function removeBroadcastReducer (state = initialState, action) {
  const idx = state.items.indexOf(action.id)

  switch (action.type) {
    case REMOVE_CHALLENGE:
      return {
        ...state,
        items: [...state.items.slice(0, idx), ...state.items.slice(idx + 1)],
        loading: { ...state.loading, remove: true },
        error: { ...state.error, remove: false }
      }

    case REMOVE_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, remove: false }
      }

    case REMOVE_CHALLENGE_FAILURE:
      return {
        ...state,
        items: [...state.items.slice(0, idx), action.id, ...state.items.slice(idx + 1)],
        loading: { ...state.loading, remove: false },
        error: { ...state.error, remove: true }
      }

    default:
      return state
  }
}
