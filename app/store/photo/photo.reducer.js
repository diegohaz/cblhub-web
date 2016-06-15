import {
  SEARCH_PHOTOS,
  SEARCH_PHOTOS_SUCCESS,
  SEARCH_PHOTOS_FAILURE
} from './photo.actions'

const initialState = {
  items: [],
  loading: false,
  error: false
}

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

    default:
      return state
  }
}
