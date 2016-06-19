import expect from 'expect'
import reducer, * as fromSession from './session.reducer'
import * as types from './session.actions'

describe('Session Reducer', function () {
  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      loading: false,
      error: false
    })
  })

  it('sould getToken', function () {
    expect(fromSession.getToken()).toNotExist()
    expect(fromSession.getToken({ token: 1 })).toEqual(1)
  })

  it('sould getIsLoading', function () {
    expect(fromSession.getIsLoading()).toNotExist()
    expect(fromSession.getIsLoading({ loading: false })).toEqual(false)
    expect(fromSession.getIsLoading({ loading: true })).toEqual(true)
  })

  it('sould getFailed', function () {
    expect(fromSession.getFailed()).toNotExist()
    expect(fromSession.getFailed({ error: false })).toEqual(false)
    expect(fromSession.getFailed({ error: true })).toEqual(true)
  })

  it('should handle CREATE_SESSION', function () {
    expect(
      reducer({}, { type: types.CREATE_SESSION })
    ).toEqual({
      error: false,
      loading: true
    })
  })

  it('should handle CREATE_SESSION_SUCCESS', function () {
    expect(
      reducer({}, { type: types.CREATE_SESSION_SUCCESS, token: 1 })
    ).toEqual({
      token: 1,
      loading: false
    })
  })

  it('should handle CREATE_SESSION_FAILURE', function () {
    expect(
      reducer({}, { type: types.CREATE_SESSION_FAILURE })
    ).toEqual({
      loading: false,
      error: true
    })
  })

  it('should handle REMOVE_SESSION', function () {
    expect(
      reducer({}, { type: types.REMOVE_SESSION })
    ).toEqual({
      token: null,
      error: false,
      loading: true
    })
  })

  it('should handle REMOVE_SESSION_SUCCESS', function () {
    expect(
      reducer({}, { type: types.REMOVE_SESSION_SUCCESS })
    ).toEqual({
      loading: false
    })
  })

  it('should handle REMOVE_SESSION_FAILURE', function () {
    expect(
      reducer({}, { type: types.REMOVE_SESSION_FAILURE })
    ).toEqual({
      loading: false,
      error: true
    })
  })
})
