import { FETCH_TAGS_SUCCESS } from './tag.actions'

const initialState = {
  list: []
}

export const getListIds = (state = initialState) => state.list || []

export default function tagReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        list: action.append ? [ ...state.list, ...action.result ] : action.result
      }
    default:
      return state
  }
}
