import expect from 'expect'
import reducer, * as fromUser from './user.reducer'
import * as types from './user.actions'

describe('User Reducer', function () {
  const initialState = {
    active: null,
    current: null
  }

  const altState = {
    active: 1,
    current: 2
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getActiveId', function () {
    expect(fromUser.getActiveId()).toNotExist()
    expect(fromUser.getActiveId(initialState)).toEqual(initialState.active)
    expect(fromUser.getActiveId(altState)).toEqual(altState.active)
  })

  it('should getCurrentId', function () {
    expect(fromUser.getCurrentId()).toNotExist()
    expect(fromUser.getCurrentId(initialState)).toEqual(initialState.current)
    expect(fromUser.getCurrentId(altState)).toEqual(altState.current)
  })

  it('should handle FETCH_USER_REQUEST', function () {
    expect(
      reducer(initialState, { type: types.FETCH_USER_REQUEST, id: 1 })
    ).toEqual({
      ...initialState,
      active: 1
    })
  })

  it('should handle FETCH_USER_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_USER_SUCCESS, result: 1 })
    ).toEqual({
      ...initialState,
      active: 1
    })
  })

  it('should handle FETCH_ME_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_ME_SUCCESS, result: 1 })
    ).toEqual({
      ...initialState,
      current: 1
    })
  })

  it('should handle REMOVE_ME', function () {
    expect(
      reducer(initialState, { type: types.REMOVE_ME })
    ).toEqual({
      ...initialState,
      current: null
    })
  })
})
