import { FETCH_META_SUCCESS } from './resource.actions'

const initialState = {}

export const getData = (state = initialState) => state

export default function resourceReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_META_SUCCESS:
      return action.data
    default:
      return state
  }
}
