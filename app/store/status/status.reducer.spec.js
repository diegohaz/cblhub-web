import expect from 'expect'
import reducer, * as fromStatus from './status.reducer'

describe('Loading Reducer', function () {
  const initialState = {
    loading: {},
    error: {}
  }

  const altState = {
    loading: {
      FETCH_USER: false,
      FETCH_USERS: true,
      CREATE_USER: false,
      UPDATE_USER: true
    },
    error: {
      FETCH_USER: false,
      FETCH_USERS: false,
      CREATE_USER: true,
      UPDATE_USER: true
    }
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getLoading', function () {
    expect(fromStatus.getLoading()).toEqual({})
    expect(fromStatus.getLoading(initialState)).toEqual(initialState.loading)
    expect(fromStatus.getLoading(altState)).toEqual(altState.loading)
  })

  it('should getIsLoading', function () {
    expect(fromStatus.getIsLoading()).toEqual(false)
    expect(fromStatus.getIsLoading(initialState)).toEqual(false)
    expect(fromStatus.getIsLoading(altState)).toEqual(true)
  })

  it('should getIsLoading with prefix', function () {
    expect(fromStatus.getIsLoading(initialState, 'FETCH_USER')).toEqual(false)
    expect(fromStatus.getIsLoading(altState, 'FETCH_USER')).toEqual(false)
    expect(fromStatus.getIsLoading(altState, 'FETCH_USERS')).toEqual(true)
  })

  it('should getIsLoading with array prefix', function () {
    expect(fromStatus.getIsLoading(initialState, ['FETCH_USER'])).toEqual(false)
    expect(fromStatus.getIsLoading(altState, ['FETCH_USER', 'CREATE_USER'])).toEqual(false)
    expect(fromStatus.getIsLoading(altState, ['FETCH_USER', 'FETCH_USERS'])).toEqual(true)
    expect(fromStatus.getIsLoading(altState, ['FETCH_USERS', 'FETCH_USER'])).toEqual(true)
  })

  it('should getError', function () {
    expect(fromStatus.getError()).toEqual({})
    expect(fromStatus.getError(initialState)).toEqual(initialState.error)
    expect(fromStatus.getError(altState)).toEqual(altState.error)
  })

  it('should getIsFailed', function () {
    expect(fromStatus.getIsFailed()).toEqual(false)
    expect(fromStatus.getIsFailed(initialState)).toEqual(false)
    expect(fromStatus.getIsFailed(altState)).toEqual(true)
  })

  it('should getIsFailed with prefix', function () {
    expect(fromStatus.getIsFailed(initialState, 'FETCH_USERS')).toEqual(false)
    expect(fromStatus.getIsFailed(altState, 'FETCH_USERS')).toEqual(false)
    expect(fromStatus.getIsFailed(altState, 'CREATE_USER')).toEqual(true)
  })

  it('should getIsFailed with array prefix', function () {
    expect(fromStatus.getIsFailed(initialState, ['FETCH_USER'])).toEqual(false)
    expect(fromStatus.getIsFailed(altState, ['FETCH_USER', 'FETCH_USERS'])).toEqual(false)
    expect(fromStatus.getIsFailed(altState, ['FETCH_USER', 'CREATE_USER'])).toEqual(true)
    expect(fromStatus.getIsFailed(altState, ['CREATE_USER', 'FETCH_USER'])).toEqual(true)
  })

  it('should handle _REQUEST', function () {
    expect(
      reducer(altState, { type: 'FETCH_USER_REQUEST' })
    ).toEqual({
      loading: {
        ...altState.loading,
        FETCH_USER: true
      },
      error: {
        ...altState.error,
        FETCH_USER: false
      }
    })
  })

  it('should handle _SUCCESS', function () {
    expect(
      reducer(altState, { type: 'UPDATE_USER_SUCCESS' })
    ).toEqual({
      loading: {
        ...altState.loading,
        UPDATE_USER: false
      },
      error: {
        ...altState.error,
        UPDATE_USER: false
      }
    })
  })

  it('should handle _FAILURE', function () {
    expect(
      reducer(altState, { type: 'FETCH_USERS_FAILURE' })
    ).toEqual({
      loading: {
        ...altState.loading,
        FETCH_USERS: false
      },
      error: {
        ...altState.error,
        FETCH_USERS: true
      }
    })
  })
})
