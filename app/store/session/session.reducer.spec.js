import expect from 'expect'
import reducer, * as fromSession from './session.reducer'
import * as types from './session.actions'

describe('Session Reducer', function () {
  const initialState = {
    token: null
  }
  const altState = {
    token: 1
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('sould getToken', function () {
    expect(fromSession.getToken()).toNotExist()
    expect(fromSession.getToken(initialState)).toEqual(initialState.token)
    expect(fromSession.getToken(altState)).toEqual(altState.token)
  })

  it('should handle CREATE_SESSION_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.CREATE_SESSION_SUCCESS, token: 1 })
    ).toEqual({
      ...initialState,
      token: 1
    })
  })

  it('should handle REMOVE_SESSION_REQUEST', function () {
    expect(
      reducer(altState, { type: types.REMOVE_SESSION_REQUEST })
    ).toEqual({
      ...altState,
      token: null
    })
  })
})
