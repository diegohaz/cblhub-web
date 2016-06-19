import expect from 'expect'
import reducer, * as fromGuide from './guide.reducer'
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

  it('should getCurrentId', function () {
    expect(fromGuide.getCurrentId()).toNotExist()
    expect(fromGuide.getCurrentId({ item: 1 })).toEqual(1)
  })

  it('should getCurrentIds', function () {
    expect(fromGuide.getCurrentIds()).toEqual([])
    expect(fromGuide.getCurrentIds({ items: [1, 2] })).toEqual([1, 2])
  })

  it('should getLoading', function () {
    expect(fromGuide.getLoading()).toEqual({})
    expect(fromGuide.getLoading({ loading: { items: true } })).toEqual({ items: true })
  })

  it('should getIsFetchingCurrentId', function () {
    expect(fromGuide.getIsFetchingCurrentId()).toNotExist()
    expect(fromGuide.getIsFetchingCurrentId({ loading: {} })).toNotExist()
    expect(fromGuide.getIsFetchingCurrentId({ loading: { item: false } })).toEqual(false)
    expect(fromGuide.getIsFetchingCurrentId({ loading: { item: true } })).toEqual(true)
  })

  it('should getIsFetchingCurrentIds', function () {
    expect(fromGuide.getIsFetchingCurrentIds()).toNotExist()
    expect(fromGuide.getIsFetchingCurrentIds({ loading: {} })).toNotExist()
    expect(fromGuide.getIsFetchingCurrentIds({ loading: { items: false } })).toEqual(false)
    expect(fromGuide.getIsFetchingCurrentIds({ loading: { items: true } })).toEqual(true)
  })

  it('should getIsCreating', function () {
    expect(fromGuide.getIsCreating()).toNotExist()
    expect(fromGuide.getIsCreating({ loading: {} })).toNotExist()
    expect(fromGuide.getIsCreating({ loading: { create: false } })).toEqual(false)
    expect(fromGuide.getIsCreating({ loading: { create: true } })).toEqual(true)
  })

  it('should getIsRemoving', function () {
    expect(fromGuide.getIsRemoving()).toNotExist()
    expect(fromGuide.getIsRemoving({ loading: {} })).toNotExist()
    expect(fromGuide.getIsRemoving({ loading: { remove: false } })).toEqual(false)
    expect(fromGuide.getIsRemoving({ loading: { remove: true } })).toEqual(true)
  })

  it('should getIsUpdating', function () {
    expect(fromGuide.getIsUpdating()).toNotExist()
    expect(fromGuide.getIsUpdating({ loading: {} })).toNotExist()
    expect(fromGuide.getIsUpdating({ loading: { update: false } })).toEqual(false)
    expect(fromGuide.getIsUpdating({ loading: { update: true } })).toEqual(true)
  })

  it('should getError', function () {
    expect(fromGuide.getError()).toEqual({})
    expect(fromGuide.getError({ error: { items: true } })).toEqual({ items: true })
  })

  it('should getCurrentIdFailed', function () {
    expect(fromGuide.getCurrentIdFailed()).toNotExist()
    expect(fromGuide.getCurrentIdFailed({ error: {} })).toNotExist()
    expect(fromGuide.getCurrentIdFailed({ error: { item: false } })).toEqual(false)
    expect(fromGuide.getCurrentIdFailed({ error: { item: true } })).toEqual(true)
  })

  it('should getCurrentIdsFailed', function () {
    expect(fromGuide.getCurrentIdsFailed()).toNotExist()
    expect(fromGuide.getCurrentIdsFailed({ error: {} })).toNotExist()
    expect(fromGuide.getCurrentIdsFailed({ error: { items: false } })).toEqual(false)
    expect(fromGuide.getCurrentIdsFailed({ error: { items: true } })).toEqual(true)
  })

  it('should getCreateFailed', function () {
    expect(fromGuide.getCreateFailed()).toNotExist()
    expect(fromGuide.getCreateFailed({ error: {} })).toNotExist()
    expect(fromGuide.getCreateFailed({ error: { create: false } })).toEqual(false)
    expect(fromGuide.getCreateFailed({ error: { create: true } })).toEqual(true)
  })

  it('should getRemoveFailed', function () {
    expect(fromGuide.getRemoveFailed()).toNotExist()
    expect(fromGuide.getRemoveFailed({ error: {} })).toNotExist()
    expect(fromGuide.getRemoveFailed({ error: { remove: false } })).toEqual(false)
    expect(fromGuide.getRemoveFailed({ error: { remove: true } })).toEqual(true)
  })

  it('should getUpdateFailed', function () {
    expect(fromGuide.getUpdateFailed()).toNotExist()
    expect(fromGuide.getUpdateFailed({ error: {} })).toNotExist()
    expect(fromGuide.getUpdateFailed({ error: { update: false } })).toEqual(false)
    expect(fromGuide.getUpdateFailed({ error: { update: true } })).toEqual(true)
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
