import expect from 'expect'
import reducer, * as fromGuide from './guide.reducer'
import * as types from './guide.actions'

describe('Guide Reducer', function () {
  const initialState = {
    active: null,
    list: [],
    removeIndex: -1
  }

  const altState = {
    active: 1,
    list: [1, 2],
    removeIndex: 1
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getActiveId', function () {
    expect(fromGuide.getActiveId()).toNotExist()
    expect(fromGuide.getActiveId(initialState)).toEqual(initialState.active)
    expect(fromGuide.getActiveId(altState)).toEqual(altState.active)
  })

  it('should getListIds', function () {
    expect(fromGuide.getListIds()).toEqual([])
    expect(fromGuide.getListIds(initialState)).toEqual(initialState.list)
    expect(fromGuide.getListIds(altState)).toEqual(altState.list)
  })

  it('should handle FETCH_GUIDES_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_GUIDES_SUCCESS, result: [1] })
    ).toEqual({
      ...initialState,
      list: [1]
    })

    expect(
      reducer({
        ...initialState,
        list: [1]
      }, {
        type: types.FETCH_GUIDES_SUCCESS,
        result: [2],
        append: true
      })
    ).toEqual({
      ...initialState,
      list: [1, 2]
    })
  })

  it('should handle FETCH_GUIDE_REQUEST', function () {
    expect(
      reducer(initialState, { type: types.FETCH_GUIDE_REQUEST, id: 1 })
    ).toEqual({
      ...initialState,
      active: 1
    })
  })

  it('should handle FETCH_GUIDE_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_GUIDE_SUCCESS, result: 1 })
    ).toEqual({
      ...initialState,
      active: 1
    })
  })

  it('should handle REMOVE_GUIDE_REQUEST', function () {
    expect(
      reducer({
        ...initialState,
        list: [1, 2, 3],
        removeIndex: 2
      }, {
        type: types.REMOVE_GUIDE_REQUEST,
        id: 4
      })
    ).toEqual({
      ...initialState,
      list: [1, 2, 3],
      removeIndex: -1
    })

    expect(
      reducer({
        ...initialState,
        list: [1, 2, 3]
      }, {
        type: types.REMOVE_GUIDE_REQUEST,
        id: 2
      })
    ).toEqual({
      ...initialState,
      list: [1, 3],
      removeIndex: 1
    })
  })

  it('should handle REMOVE_GUIDE_SUCCESS', function () {
    expect(
      reducer({
        ...initialState,
        removeIndex: 2
      }, {
        type: types.REMOVE_GUIDE_SUCCESS
      })
    ).toEqual({
      ...initialState,
      removeIndex: -1
    })
  })

  it('should handle REMOVE_GUIDE_FAILURE', function () {
    expect(
      reducer({
        ...initialState,
        list: [1, 3],
        removeIndex: 1
      }, {
        type: types.REMOVE_GUIDE_FAILURE,
        id: 2
      })
    ).toEqual({
      ...initialState,
      list: [1, 2, 3],
      removeIndex: -1
    })
  })
})
