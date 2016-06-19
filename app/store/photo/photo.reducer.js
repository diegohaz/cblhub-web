import {
  SEARCH_PHOTOS,
  SEARCH_PHOTOS_SUCCESS,
  SEARCH_PHOTOS_FAILURE,
  SELECT_PHOTO,
  DESELECT_PHOTO
} from './photo.actions'

const initialState = {
  selected: null,
  items: [],
  loading: false,
  error: false
}

export const getSelectedId = (state = {}) => state.selected
export const getCurrentIds = (state = {}) => state.items || []
export const getIsLoading = (state = {}) => state.loading
export const getFailed = (state = {}) => state.error

export default function photoReducer (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PHOTOS:
      return {
        ...state,
        loading: true,
        error: false
      }
    case SEARCH_PHOTOS_SUCCESS:
      return {
        ...state,
        items: action.result,
        loading: false
      }
    case SEARCH_PHOTOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
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
