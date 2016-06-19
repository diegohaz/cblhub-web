import {
  FETCH_CHALLENGES,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_FAILURE,
  FETCH_CHALLENGE,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_FAILURE,
  CREATE_CHALLENGE,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_CHALLENGE_FAILURE,
  UPDATE_CHALLENGE,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_FAILURE,
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
    remove: false,
    update: false
  },
  error: {
    items: false,
    item: false,
    create: false,
    remove: false,
    update: false
  },
  removing: -1
}

export const getCurrentId = (state = {}) => state.item
export const getCurrentIds = (state = {}) => state.items || []
export const getLoading = (state = {}) => state.loading || {}
export const getIsFetchingCurrentId = (state) => getLoading(state).item
export const getIsFetchingCurrentIds = (state) => getLoading(state).items
export const getIsCreating = (state) => getLoading(state).create
export const getIsRemoving = (state) => getLoading(state).remove
export const getIsUpdating = (state) => getLoading(state).update
export const getError = (state = {}) => state.error || {}
export const getCurrentIdFailed = (state) => getError(state).item
export const getCurrentIdsFailed = (state) => getError(state).items
export const getCreateFailed = (state) => getError(state).create
export const getRemoveFailed = (state) => getError(state).remove
export const getUpdateFailed = (state) => getError(state).update

export default function challengeReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHALLENGES:
      return {
        ...state,
        loading: { ...state.loading, items: true },
        error: { ...state.error, items: false }
      }
    case FETCH_CHALLENGES_SUCCESS:
      return {
        ...state,
        items: action.append ? [ ...state.items, ...action.result ] : action.result,
        loading: { ...state.loading, items: false }
      }
    case FETCH_CHALLENGES_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, items: false },
        error: { items: true }
      }

    case FETCH_CHALLENGE:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: { ...state.loading, item: true },
        error: { item: false }
      }
    case FETCH_CHALLENGE_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: { ...state.loading, item: !!action.cached }
      }
    case FETCH_CHALLENGE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, item: false },
        error: { ...state.error, item: true }
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
        error: { create: true }
      }

    case UPDATE_CHALLENGE:
      return {
        ...state,
        loading: { ...state.loading, update: true },
        error: { ...state.error, update: false }
      }
    case UPDATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, update: false }
      }
    case UPDATE_CHALLENGE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, update: false },
        error: { update: true }
      }

    case REMOVE_CHALLENGE:
    case REMOVE_CHALLENGE_SUCCESS:
    case REMOVE_CHALLENGE_FAILURE:
      return removeChallengeReducer(state, action)

    default:
      return state
  }
}

function removeChallengeReducer (state = initialState, action) {
  const idx = state.items.indexOf(action.id)

  switch (action.type) {
    case REMOVE_CHALLENGE:
      return {
        ...state,
        items: [ ...state.items.slice(0, idx), ...state.items.slice(idx + 1) ],
        loading: { ...state.loading, remove: true },
        error: { ...state.error, remove: false },
        removing: idx
      }

    case REMOVE_CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, remove: false },
        removing: -1
      }

    case REMOVE_CHALLENGE_FAILURE:
      return {
        ...state,
        items: [
          ...state.items.slice(0, state.removing),
          action.id,
          ...state.items.slice(state.removing)
        ],
        loading: { ...state.loading, remove: false },
        error: { ...state.error, remove: true },
        removing: -1
      }
  }
}
