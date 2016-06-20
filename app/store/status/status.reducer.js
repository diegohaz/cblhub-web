import find from 'lodash/find'
import pick from 'lodash/pick'

const initialState = {
  loading: {},
  error: {}
}

export const getLoading = (state = initialState) => state.loading || {}
export const getError = (state = initialState) => state.error || {}

const getIs = (state, prefix) => {
  if (typeof prefix === 'undefined') {
    return !!find(state, (value) => !!value)
  } else if (Array.isArray(prefix)) {
    return !!find(pick(state, prefix), (value) => !!value)
  } else if (state.hasOwnProperty(prefix)) {
    return !!state[prefix]
  } else {
    return false
  }
}

export const getIsLoading = (state, prefix) => getIs(getLoading(state), prefix)
export const getIsFailed = (state, prefix) => getIs(getError(state), prefix)

export default function statusReducer (state = initialState, action) {
  if (!action.type) return state

  let [ suffix, ...prefix ] = action.type.split('_').reverse()
  prefix = prefix.reverse().join('_')

  switch (suffix) {
    case 'REQUEST':
      return {
        loading: {
          ...state.loading,
          [prefix]: true
        },
        error: {
          ...state.error,
          [prefix]: false
        }
      }
    case 'SUCCESS':
      return {
        loading: {
          ...state.loading,
          [prefix]: false
        },
        error: {
          ...state.error,
          [prefix]: false
        }
      }
    case 'FAILURE':
      return {
        loading: {
          ...state.loading,
          [prefix]: false
        },
        error: {
          ...state.error,
          [prefix]: true
        }
      }
    default:
      return state
  }
}
