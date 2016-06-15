import {
  FETCH_TAGS,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from './tag.actions'

const initialState = {
  items: [],
  loading: false,
  error: false
}

export default function tagReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        ...state,
        loading: true,
        error: false
      }
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        items: action.append ? [ ...state.items, ...action.result ] : action.result,
        loading: false
      }
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }

    default:
      return state
  }
}
