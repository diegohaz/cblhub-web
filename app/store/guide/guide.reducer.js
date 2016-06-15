import {
  FETCH_GUIDES,
  FETCH_GUIDES_SUCCESS,
  FETCH_GUIDES_FAILURE,
  FETCH_GUIDE,
  FETCH_GUIDE_SUCCESS,
  FETCH_GUIDE_FAILURE,
  CREATE_GUIDE,
  CREATE_GUIDE_SUCCESS,
  CREATE_GUIDE_FAILURE,
  UPDATE_GUIDE,
  UPDATE_GUIDE_SUCCESS,
  UPDATE_GUIDE_FAILURE,
  REMOVE_GUIDE,
  REMOVE_GUIDE_SUCCESS,
  REMOVE_GUIDE_FAILURE
} from './guide.actions'

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

export default function guideReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_GUIDES:
      return {
        ...state,
        loading: { ...state.loading, items: true },
        error: { ...state.error, items: false }
      }
    case FETCH_GUIDES_SUCCESS:
      return {
        ...state,
        items: action.append ? [ ...state.items, ...action.result ] : action.result,
        loading: { ...state.loading, items: false }
      }
    case FETCH_GUIDES_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, items: false },
        error: { items: true }
      }

    case FETCH_GUIDE:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: { ...state.loading, item: true },
        error: { item: false }
      }
    case FETCH_GUIDE_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: { ...state.loading, item: !!action.cached }
      }
    case FETCH_GUIDE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, item: false },
        error: { ...state.error, item: true }
      }

    case CREATE_GUIDE:
      return {
        ...state,
        loading: { ...state.loading, create: true },
        error: { ...state.error, create: false }
      }
    case CREATE_GUIDE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, create: false }
      }
    case CREATE_GUIDE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, create: false },
        error: { create: true }
      }

    case UPDATE_GUIDE:
      return {
        ...state,
        loading: { ...state.loading, update: true },
        error: { ...state.error, update: false }
      }
    case UPDATE_GUIDE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, update: false }
      }
    case UPDATE_GUIDE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, update: false },
        error: { update: true }
      }

    case REMOVE_GUIDE:
    case REMOVE_GUIDE_SUCCESS:
    case REMOVE_GUIDE_FAILURE:
      return removeGuideReducer(state, action)

    default:
      return state
  }
}

function removeGuideReducer (state = initialState, action) {
  const idx = state.items.indexOf(action.id)

  switch (action.type) {
    case REMOVE_GUIDE:
      return {
        ...state,
        items: [ ...state.items.slice(0, idx), ...state.items.slice(idx + 1) ],
        loading: { ...state.loading, remove: true },
        error: { ...state.error, remove: false },
        removing: idx
      }

    case REMOVE_GUIDE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, remove: false },
        removing: -1
      }

    case REMOVE_GUIDE_FAILURE:
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
