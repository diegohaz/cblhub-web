import expect from 'expect'
import reducer, * as fromChallenge from './challenge.reducer'
import * as types from './challenge.actions'

describe('Challenge Reducer', function () {
  const initialState = {
    active: null,
    list: [],
    canLoadMore: true,
    removeIndex: -1
  }

  const altState = {
    active: 1,
    list: [1, 2],
    canLoadMore: false,
    removeIndex: 1
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getActiveId', function () {
    expect(fromChallenge.getActiveId()).toNotExist()
    expect(fromChallenge.getActiveId(initialState)).toEqual(initialState.active)
    expect(fromChallenge.getActiveId(altState)).toEqual(altState.active)
  })

  it('should getListIds', function () {
    expect(fromChallenge.getListIds()).toEqual([])
    expect(fromChallenge.getListIds(initialState)).toEqual(initialState.list)
    expect(fromChallenge.getListIds(altState)).toEqual(altState.list)
  })

  it('should getCanLoadMore', function () {
    expect(fromChallenge.getCanLoadMore()).toEqual(true)
    expect(fromChallenge.getCanLoadMore(initialState)).toEqual(initialState.canLoadMore)
    expect(fromChallenge.getCanLoadMore(altState)).toEqual(altState.canLoadMore)
  })

  it('should handle FETCH_CHALLENGES_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_CHALLENGES_SUCCESS, result: [1] })
    ).toEqual({
      ...initialState,
      list: [1]
    })

    expect(
      reducer({
        ...initialState,
        list: [1]
      }, {
        type: types.FETCH_CHALLENGES_SUCCESS,
        result: [2],
        append: true
      })
    ).toEqual({
      ...initialState,
      list: [1, 2]
    })

    expect(
      reducer({
        ...initialState,
        list: [1]
      }, {
        type: types.FETCH_CHALLENGES_SUCCESS,
        result: [],
        append: true
      })
    ).toEqual({
      ...initialState,
      list: [1],
      canLoadMore: false
    })
  })

  it('should handle FETCH_CHALLENGE_REQUEST', function () {
    expect(
      reducer(initialState, { type: types.FETCH_CHALLENGE_REQUEST, id: 1 })
    ).toEqual({
      ...initialState,
      active: 1
    })
  })

  it('should handle FETCH_CHALLENGE_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_CHALLENGE_SUCCESS, result: 1 })
    ).toEqual({
      ...initialState,
      active: 1
    })
  })

  it('should handle REMOVE_CHALLENGE_REQUEST', function () {
    expect(
      reducer({
        ...initialState,
        list: [1, 2, 3],
        removeIndex: 2
      }, {
        type: types.REMOVE_CHALLENGE_REQUEST,
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
        type: types.REMOVE_CHALLENGE_REQUEST,
        id: 2
      })
    ).toEqual({
      ...initialState,
      list: [1, 3],
      removeIndex: 1
    })
  })

  it('should handle REMOVE_CHALLENGE_SUCCESS', function () {
    expect(
      reducer({
        ...initialState,
        removeIndex: 2
      }, {
        type: types.REMOVE_CHALLENGE_SUCCESS
      })
    ).toEqual({
      ...initialState,
      removeIndex: -1
    })
  })

  it('should handle REMOVE_CHALLENGE_FAILURE', function () {
    expect(
      reducer({
        ...initialState,
        list: [1, 3],
        removeIndex: 1
      }, {
        type: types.REMOVE_CHALLENGE_FAILURE,
        id: 2
      })
    ).toEqual({
      ...initialState,
      list: [1, 2, 3],
      removeIndex: -1
    })
  })
})
