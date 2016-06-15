import expect from 'expect'
import reducer from './guide.reducer'
import * as types from './guide.actions'

describe('Guide Reducer', function () {
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

  it('should handle FETCH_GUIDES', function () {
    expect(
      reducer({}, { type: types.FETCH_GUIDES })
    ).toEqual({
      error: { items: false },
      loading: { items: true }
    })
  })

  it('should handle FETCH_GUIDES_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_GUIDES_SUCCESS, result: [1] })
    ).toEqual({
      items: [1],
      loading: { items: false }
    })

    expect(
      reducer({ items: [1] }, { type: types.FETCH_GUIDES_SUCCESS, result: [2], append: true })
    ).toEqual({
      items: [1, 2],
      loading: { items: false }
    })
  })

  it('should handle FETCH_GUIDES_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_GUIDES_FAILURE })
    ).toEqual({
      loading: { items: false },
      error: { items: true }
    })
  })

  it('should handle FETCH_GUIDE', function () {
    expect(
      reducer({}, { type: types.FETCH_GUIDE, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 1 }, { type: types.FETCH_GUIDE, id: 1 })
    ).toEqual({
      item: 1,
      error: { item: false },
      loading: { item: true }
    })

    expect(
      reducer({ item: 2 }, { type: types.FETCH_GUIDE, id: 1 })
    ).toEqual({
      item: null,
      error: { item: false },
      loading: { item: true }
    })
  })

  it('should handle FETCH_GUIDE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_GUIDE_SUCCESS, result: 1 })
    ).toEqual({
      item: 1,
      loading: { item: false }
    })

    expect(
      reducer({}, { type: types.FETCH_GUIDE_SUCCESS, result: 1, cached: true })
    ).toEqual({
      item: 1,
      loading: { item: true }
    })
  })

  it('should handle FETCH_GUIDE_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_GUIDE_FAILURE })
    ).toEqual({
      loading: { item: false },
      error: { item: true }
    })
  })

  it('should handle CREATE_GUIDE', function () {
    expect(
      reducer({}, { type: types.CREATE_GUIDE })
    ).toEqual({
      error: { create: false },
      loading: { create: true }
    })
  })

  it('should handle CREATE_GUIDE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.CREATE_GUIDE_SUCCESS, result: 1 })
    ).toEqual({
      loading: { create: false }
    })
  })

  it('should handle CREATE_GUIDE_FAILURE', function () {
    expect(
      reducer({}, { type: types.CREATE_GUIDE_FAILURE })
    ).toEqual({
      loading: { create: false },
      error: { create: true }
    })
  })

  it('should handle UPDATE_GUIDE', function () {
    expect(
      reducer({}, { type: types.UPDATE_GUIDE })
    ).toEqual({
      error: { update: false },
      loading: { update: true }
    })
  })

  it('should handle UPDATE_GUIDE_SUCCESS', function () {
    expect(
      reducer({}, { type: types.UPDATE_GUIDE_SUCCESS })
    ).toEqual({
      loading: { update: false }
    })
  })

  it('should handle UPDATE_GUIDE_FAILURE', function () {
    expect(
      reducer({}, { type: types.UPDATE_GUIDE_FAILURE })
    ).toEqual({
      loading: { update: false },
      error: { update: true }
    })
  })

  it('should handle REMOVE_GUIDE', function () {
    expect(
      reducer({ items: [] }, { type: types.REMOVE_GUIDE, id: 1 })
    ).toEqual({
      items: [],
      error: { remove: false },
      loading: { remove: true },
      removing: -1
    })

    expect(
      reducer({ items: [0, 1, 2] }, { type: types.REMOVE_GUIDE, id: 1 })
    ).toEqual({
      items: [0, 2],
      error: { remove: false },
      loading: { remove: true },
      removing: 1
    })
  })

  it('should handle REMOVE_GUIDE_SUCCESS', function () {
    expect(
      reducer({ items: [] }, { type: types.REMOVE_GUIDE_SUCCESS, id: 1 })
    ).toEqual({
      items: [],
      loading: { remove: false },
      removing: -1
    })
  })

  it('should handle REMOVE_GUIDE_FAILURE', function () {
    expect(
      reducer({ items: [0, 2], removing: 1 }, { type: types.REMOVE_GUIDE_FAILURE, id: 1 })
    ).toEqual({
      items: [0, 1, 2],
      loading: { remove: false },
      error: { remove: true },
      removing: -1
    })
  })
})
