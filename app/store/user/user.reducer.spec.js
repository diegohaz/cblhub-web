import expect from 'expect'
import reducer from './user.reducer'
import * as types from './user.actions'

describe('User Reducer', function () {
  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual({
      item: null,
      me: null,
      loading: {
        me: false,
        item: false
      },
      error: {
        me: false,
        item: false
      }
    })
  })

  it('should handle REQUEST_USER', function () {
    expect(
      reducer({}, { type: types.REQUEST_USER, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 1 }, { type: types.REQUEST_USER, id: 1 })
    ).toEqual({
      item: 1,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 2 }, { type: types.REQUEST_USER, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })
  })

  it('should handle REQUEST_USER_SUCCESS', function () {
    expect(
      reducer({}, { type: types.REQUEST_USER_SUCCESS, result: 1 })
    ).toEqual({
      item: 1,
      loading: { item: false }
    })

    expect(
      reducer({}, { type: types.REQUEST_USER_SUCCESS, result: 1, cached: true })
    ).toEqual({
      item: 1,
      loading: { item: true }
    })
  })

  it('should handle REQUEST_USER_FAILURE', function () {
    expect(
      reducer({}, { type: types.REQUEST_USER_FAILURE })
    ).toEqual({
      loading: { item: false },
      error: { item: true }
    })
  })

  it('should handle REQUEST_ME', function () {
    expect(
      reducer({}, { type: types.REQUEST_ME })
    ).toEqual({
      error: { me: false },
      loading: { me: true }
    })
  })

  it('should handle REQUEST_ME_SUCCESS', function () {
    expect(
      reducer({}, { type: types.REQUEST_ME_SUCCESS, result: 1 })
    ).toEqual({
      me: 1,
      loading: { me: false }
    })
  })

  it('should handle REQUEST_ME_FAILURE', function () {
    expect(
      reducer({}, { type: types.REQUEST_ME_FAILURE })
    ).toEqual({
      loading: { me: false },
      error: { me: true }
    })
  })

  it('should handle UPDATE_ME', function () {
    expect(
      reducer({}, { type: types.UPDATE_ME, result: 1 })
    ).toEqual({
      me: 1,
      error: { me: false },
      loading: { me: true }
    })
  })
})
