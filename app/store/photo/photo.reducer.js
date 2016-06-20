import {
  SEARCH_PHOTOS_REQUEST,
  SEARCH_PHOTOS_SUCCESS,
  SELECT_PHOTO,
  DESELECT_PHOTO
} from './photo.actions'

const initialState = {
  selected: null,
  list: []
}

export const getSelectedId = (state = initialState) => state.selected
export const getListIds = (state = initialState) => state.list || []

export default function photoReducer (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PHOTOS_REQUEST:
      return initialState
    case SEARCH_PHOTOS_SUCCESS:
      return {
        ...state,
        list: action.result
      }
    case SELECT_PHOTO:
      return {
        ...state,
        selected: action.id
      }
    case DESELECT_PHOTO:
      return {
        ...state,
        selected: null
      }
    default:
      return state
  }
}
