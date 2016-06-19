import expect from 'expect'
import reducer, * as fromUser from './user.reducer'
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

  it('should getCurrentId', function () {
    expect(fromUser.getCurrentId()).toNotExist()
    expect(fromUser.getCurrentId({ item: 1 })).toEqual(1)
  })

  it('should getMyId', function () {
    expect(fromUser.getMyId()).toNotExist()
    expect(fromUser.getMyId({ me: 1 })).toEqual(1)
  })

  it('should getLoading', function () {
    expect(fromUser.getLoading()).toEqual({})
    expect(fromUser.getLoading({ loading: { me: true } })).toEqual({ me: true })
  })

  it('should getIsFetchingCurrentId', function () {
    expect(fromUser.getIsFetchingCurrentId()).toNotExist()
    expect(fromUser.getIsFetchingCurrentId({ loading: { item: false } })).toEqual(false)
    expect(fromUser.getIsFetchingCurrentId({ loading: { item: true } })).toEqual(true)
  })

  it('should getIsFetchingMe', function () {
    expect(fromUser.getIsFetchingMe()).toNotExist()
    expect(fromUser.getIsFetchingMe({ loading: { me: false } })).toEqual(false)
    expect(fromUser.getIsFetchingMe({ loading: { me: true } })).toEqual(true)
  })

  it('should getError', function () {
    expect(fromUser.getError()).toEqual({})
    expect(fromUser.getError({ error: { me: true } })).toEqual({ me: true })
  })

  it('should getCurrentIdFailed', function () {
    expect(fromUser.getCurrentIdFailed()).toNotExist()
    expect(fromUser.getCurrentIdFailed({ error: { item: false } })).toEqual(false)
    expect(fromUser.getCurrentIdFailed({ error: { item: true } })).toEqual(true)
  })

  it('should getMeFailed', function () {
    expect(fromUser.getMeFailed()).toNotExist()
    expect(fromUser.getMeFailed({ error: { me: false } })).toEqual(false)
    expect(fromUser.getMeFailed({ error: { me: true } })).toEqual(true)
  })

  it('should handle FETCH_USER', function () {
    expect(
      reducer({}, { type: types.FETCH_USER, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 1 }, { type: types.FETCH_USER, id: 1 })
    ).toEqual({
      item: 1,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 2 }, { type: types.FETCH_USER, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })
  })

  it('should handle FETCH_USER_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_USER_SUCCESS, result: 1 })
    ).toEqual({
      item: 1,
      loading: { item: false }
    })

    expect(
      reducer({}, { type: types.FETCH_USER_SUCCESS, result: 1, cached: true })
    ).toEqual({
      item: 1,
      loading: { item: true }
    })
  })

  it('should handle FETCH_USER_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_USER_FAILURE })
    ).toEqual({
      loading: { item: false },
      error: { item: true }
    })
  })

  it('should handle FETCH_ME', function () {
    expect(
      reducer({}, { type: types.FETCH_ME })
    ).toEqual({
      error: { me: false },
      loading: { me: true }
    })
  })

  it('should handle FETCH_ME_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_ME_SUCCESS, result: 1 })
    ).toEqual({
      me: 1,
      loading: { me: false }
    })
  })

  it('should handle FETCH_ME_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_ME_FAILURE })
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

  it('should handle REMOVE_ME', function () {
    expect(
      reducer({ me: 1 }, { type: types.REMOVE_ME })
    ).toEqual({
      me: null
    })
  })
})
