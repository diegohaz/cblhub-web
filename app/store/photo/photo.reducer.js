import { LOCATION_CHANGE } from 'react-router-redux'
import {
  UPDATE_CHALLENGE_SUCCESS,
  SEARCH_PHOTOS_REQUEST,
  SEARCH_PHOTOS_SUCCESS,
  RESET_PHOTOS,
  SELECT_PHOTO,
  DESELECT_PHOTO
} from '../'

const initialState = {
  selected: null,
  list: []
}

export const getSelectedId = (state = initialState) => state.selected
export const getListIds = (state = initialState) => state.list || []

export default function photoReducer (state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
    case UPDATE_CHALLENGE_SUCCESS:
    case RESET_PHOTOS:
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
