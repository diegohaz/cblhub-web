import {
  FETCH_META,
  FETCH_META_SUCCESS,
  FETCH_META_FAILURE
} from './resource.actions'

const initialState = {
  data: null,
  loading: false,
  error: false
}

export default function resourceReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_META:
      return {
        ...state,
        loading: true,
        error: false
      }
    case FETCH_META_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      }
    case FETCH_META_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }

    default:
      return state
  }
}
