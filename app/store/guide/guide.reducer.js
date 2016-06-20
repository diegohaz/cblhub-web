import {
  FETCH_GUIDES_SUCCESS,
  FETCH_GUIDE_REQUEST,
  FETCH_GUIDE_SUCCESS,
  REMOVE_GUIDE_REQUEST,
  REMOVE_GUIDE_SUCCESS,
  REMOVE_GUIDE_FAILURE
} from './guide.actions'

const initialState = {
  active: null,
  list: [],
  removeIndex: -1
}

export const getActiveId = (state = initialState) => state.active
export const getListIds = (state = initialState) => state.list || []

export default function guideReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_GUIDES_SUCCESS:
      return {
        ...state,
        list: action.append ? [ ...state.list, ...action.result ] : action.result
      }
    case FETCH_GUIDE_REQUEST:
      return {
        ...state,
        active: action.id
      }
    case FETCH_GUIDE_SUCCESS:
      return {
        ...state,
        active: action.result
      }
    default:
      return removeGuideReducer(state, action)
  }
}

function removeGuideReducer (state = initialState, action) {
  const idx = state.list.indexOf(action.id)

  switch (action.type) {
    case REMOVE_GUIDE_REQUEST:
      return {
        ...state,
        list: ~idx ? [ ...state.list.slice(0, idx), ...state.list.slice(idx + 1) ] : state.list,
        removeIndex: idx
      }
    case REMOVE_GUIDE_SUCCESS:
      return {
        ...state,
        removeIndex: -1
      }
    case REMOVE_GUIDE_FAILURE:
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
