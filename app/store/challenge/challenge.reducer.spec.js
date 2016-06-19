import expect from 'expect'
import reducer, * as fromChallenge from './challenge.reducer'
import * as types from './challenge.actions'

describe('Challenge Reducer', function () {
  it('should return the initial state', function () {
    const initialState = {
      items: [],
      item: null,
      loading: {
        items: false,
        item: false,
        create: false,
        remove: false,
        update: false
      },
      error: {
        items: false,
        item: false,
        create: false,
        remove: false,
        update: false
      },
      removing: -1
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getCurrentId', function () {
    expect(fromChallenge.getCurrentId()).toNotExist()
    expect(fromChallenge.getCurrentId({ item: 1 })).toEqual(1)
  })

  it('should getCurrentIds', function () {
    expect(fromChallenge.getCurrentIds()).toEqual([])
    expect(fromChallenge.getCurrentIds({ items: [1, 2] })).toEqual([1, 2])
  })

  it('should getLoading', function () {
    expect(fromChallenge.getLoading()).toEqual({})
    expect(fromChallenge.getLoading({ loading: { items: true } })).toEqual({ items: true })
  })

  it('should getIsFetchingCurrentId', function () {
    expect(fromChallenge.getIsFetchingCurrentId()).toNotExist()
    expect(fromChallenge.getIsFetchingCurrentId({ loading: {} })).toNotExist()
    expect(fromChallenge.getIsFetchingCurrentId({ loading: { item: false } })).toEqual(false)
    expect(fromChallenge.getIsFetchingCurrentId({ loading: { item: true } })).toEqual(true)
  })

  it('should getIsFetchingCurrentIds', function () {
    expect(fromChallenge.getIsFetchingCurrentIds()).toNotExist()
    expect(fromChallenge.getIsFetchingCurrentIds({ loading: {} })).toNotExist()
    expect(fromChallenge.getIsFetchingCurrentIds({ loading: { items: false } })).toEqual(false)
    expect(fromChallenge.getIsFetchingCurrentIds({ loading: { items: true } })).toEqual(true)
  })

  it('should getIsCreating', function () {
    expect(fromChallenge.getIsCreating()).toNotExist()
    expect(fromChallenge.getIsCreating({ loading: {} })).toNotExist()
    expect(fromChallenge.getIsCreating({ loading: { create: false } })).toEqual(false)
    expect(fromChallenge.getIsCreating({ loading: { create: true } })).toEqual(true)
  })

  it('should getIsRemoving', function () {
    expect(fromChallenge.getIsRemoving()).toNotExist()
    expect(fromChallenge.getIsRemoving({ loading: {} })).toNotExist()
    expect(fromChallenge.getIsRemoving({ loading: { remove: false } })).toEqual(false)
    expect(fromChallenge.getIsRemoving({ loading: { remove: true } })).toEqual(true)
  })

  it('should getIsUpdating', function () {
    expect(fromChallenge.getIsUpdating()).toNotExist()
    expect(fromChallenge.getIsUpdating({ loading: {} })).toNotExist()
    expect(fromChallenge.getIsUpdating({ loading: { update: false } })).toEqual(false)
    expect(fromChallenge.getIsUpdating({ loading: { update: true } })).toEqual(true)
  })

  it('should getError', function () {
    expect(fromChallenge.getError()).toEqual({})
    expect(fromChallenge.getError({ error: { items: true } })).toEqual({ items: true })
  })

  it('should getCurrentIdFailed', function () {
    expect(fromChallenge.getCurrentIdFailed()).toNotExist()
    expect(fromChallenge.getCurrentIdFailed({ error: {} })).toNotExist()
    expect(fromChallenge.getCurrentIdFailed({ error: { item: false } })).toEqual(false)
    expect(fromChallenge.getCurrentIdFailed({ error: { item: true } })).toEqual(true)
  })

  it('should getCurrentIdsFailed', function () {
    expect(fromChallenge.getCurrentIdsFailed()).toNotExist()
    expect(fromChallenge.getCurrentIdsFailed({ error: {} })).toNotExist()
    expect(fromChallenge.getCurrentIdsFailed({ error: { items: false } })).toEqual(false)
    expect(fromChallenge.getCurrentIdsFailed({ error: { items: true } })).toEqual(true)
  })

  it('should getCreateFailed', function () {
    expect(fromChallenge.getCreateFailed()).toNotExist()
    expect(fromChallenge.getCreateFailed({ error: {} })).toNotExist()
    expect(fromChallenge.getCreateFailed({ error: { create: false } })).toEqual(false)
    expect(fromChallenge.getCreateFailed({ error: { create: true } })).toEqual(true)
  })

  it('should getRemoveFailed', function () {
    expect(fromChallenge.getRemoveFailed()).toNotExist()
    expect(fromChallenge.getRemoveFailed({ error: {} })).toNotExist()
    expect(fromChallenge.getRemoveFailed({ error: { remove: false } })).toEqual(false)
    expect(fromChallenge.getRemoveFailed({ error: { remove: true } })).toEqual(true)
  })

  it('should getUpdateFailed', function () {
    expect(fromChallenge.getUpdateFailed()).toNotExist()
    expect(fromChallenge.getUpdateFailed({ error: {} })).toNotExist()
    expect(fromChallenge.getUpdateFailed({ error: { update: false } })).toEqual(false)
    expect(fromChallenge.getUpdateFailed({ error: { update: true } })).toEqual(true)
  })

  it('should handle FETCH_CHALLENGES', function () {
    expect(
      reducer({}, { type: types.FETCH_CHALLENGES })
    ).toEqual({
      error: { items: false },
      loading: { items: true }
    })
  })

  it('should handle FETCH_CHALLENGES_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_CHALLENGES_SUCCESS, result: [1] })
    ).toEqual({
      items: [1],
      loading: { items: false }
    })

    expect(
      reducer({ items: [1] }, { type: types.FETCH_CHALLENGES_SUCCESS, result: [2], append: true })
    ).toEqual({
      items: [1, 2],
      loading: { items: false }
    })
  })

  it('should handle FETCH_CHALLENGES_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_CHALLENGES_FAILURE })
    ).toEqual({
      loading: { items: false },
      error: { items: true }
    })
  })

  it('should handle FETCH_CHALLENGE', function () {
    expect(
      reducer({}, { type: types.FETCH_CHALLENGE, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 1 }, { type: types.FETCH_CHALLENGE, id: 1 })
    ).toEqual({
      item: 1,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 2 }, { type: types.FETCH_CHALLENGE, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })
  })

  it('should handle FETCH_CHALLENGE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_CHALLENGE_SUCCESS, result: 1 })
    ).toEqual({
      item: 1,
      loading: { item: false }
    })

    expect(
      reducer({}, { type: types.FETCH_CHALLENGE_SUCCESS, result: 1, cached: true })
    ).toEqual({
      item: 1,
      loading: { item: true }
    })
  })

  it('should handle FETCH_CHALLENGE_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_CHALLENGE_FAILURE })
    ).toEqual({
      loading: { item: false },
      error: { item: true }
    })
  })

  it('should handle CREATE_CHALLENGE', function () {
    expect(
      reducer({}, { type: types.CREATE_CHALLENGE })
    ).toEqual({
      error: { create: false },
      loading: { create: true }
    })
  })

  it('should handle CREATE_CHALLENGE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.CREATE_CHALLENGE_SUCCESS, result: 1 })
    ).toEqual({
      loading: { create: false }
    })
  })

  it('should handle CREATE_CHALLENGE_FAILURE', function () {
    expect(
      reducer({}, { type: types.CREATE_CHALLENGE_FAILURE })
    ).toEqual({
      loading: { create: false },
      error: { create: true }
    })
  })

  it('should handle UPDATE_CHALLENGE', function () {
    expect(
      reducer({}, { type: types.UPDATE_CHALLENGE })
    ).toEqual({
      error: { update: false },
      loading: { update: true }
    })
  })

  it('should handle UPDATE_CHALLENGE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.UPDATE_CHALLENGE_SUCCESS })
    ).toEqual({
      loading: { update: false }
    })
  })

  it('should handle UPDATE_CHALLENGE_FAILURE', function () {
    expect(
      reducer({}, { type: types.UPDATE_CHALLENGE_FAILURE })
    ).toEqual({
      loading: { update: false },
      error: { update: true }
    })
  })

  it('should handle REMOVE_CHALLENGE', function () {
    expect(
      reducer({ items: [] }, { type: types.REMOVE_CHALLENGE, id: 1 })
    ).toEqual({
      items: [],
      error: { remove: false },
      loading: { remove: true },
      removing: -1
    })

    expect(
      reducer({ items: [0, 1, 2] }, { type: types.REMOVE_CHALLENGE, id: 1 })
    ).toEqual({
      items: [0, 2],
      error: { remove: false },
      loading: { remove: true },
      removing: 1
    })
  })

  it('should handle REMOVE_CHALLENGE_SUCCESS', function () {
    expect(
      reducer({ items: [] }, { type: types.REMOVE_CHALLENGE_SUCCESS, id: 1 })
    ).toEqual({
      items: [],
      loading: { remove: false },
      removing: -1
    })
  })

  it('should handle REMOVE_CHALLENGE_FAILURE', function () {
    expect(
      reducer({ items: [0, 2], removing: 1 }, { type: types.REMOVE_CHALLENGE_FAILURE, id: 1 })
    ).toEqual({
      items: [0, 1, 2],
      loading: { remove: false },
      error: { remove: true },
      removing: -1
    })
  })
})
