import expect from 'expect'
import reducer from './challenge.reducer'
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
        remove: false
      },
      error: {
        items: false,
        item: false,
        create: false,
        remove: false
      },
      removing: -1
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle REQUEST_CHALLENGES', function () {
    expect(
      reducer({}, { type: types.REQUEST_CHALLENGES })
    ).toEqual({
      error: { items: false },
      loading: { items: true }
    })
  })

  it('should handle REQUEST_CHALLENGES_SUCCESS', function () {
    expect(
      reducer({}, { type: types.REQUEST_CHALLENGES_SUCCESS, result: [1] })
    ).toEqual({
      items: [1],
      loading: { items: false }
    })

    expect(
      reducer({ items: [1] }, { type: types.REQUEST_CHALLENGES_SUCCESS, result: [2], append: true })
    ).toEqual({
      items: [1, 2],
      loading: { items: false }
    })
  })

  it('should handle REQUEST_CHALLENGES_FAILURE', function () {
    expect(
      reducer({}, { type: types.REQUEST_CHALLENGES_FAILURE })
    ).toEqual({
      loading: { items: false },
      error: { items: true }
    })
  })

  it('should handle REQUEST_CHALLENGE', function () {
    expect(
      reducer({}, { type: types.REQUEST_CHALLENGE, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 1 }, { type: types.REQUEST_CHALLENGE, id: 1 })
    ).toEqual({
      item: 1,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 2 }, { type: types.REQUEST_CHALLENGE, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })
  })

  it('should handle REQUEST_CHALLENGE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.REQUEST_CHALLENGE_SUCCESS, result: 1 })
    ).toEqual({
      item: 1,
      loading: { item: false }
    })

    expect(
      reducer({}, { type: types.REQUEST_CHALLENGE_SUCCESS, result: 1, cached: true })
    ).toEqual({
      item: 1,
      loading: { item: true }
    })
  })

  it('should handle REQUEST_CHALLENGE_FAILURE', function () {
    expect(
      reducer({}, { type: types.REQUEST_CHALLENGE_FAILURE })
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
