import expect from 'expect'
import reducer, * as fromTag from './tag.reducer'
import * as types from './tag.actions'

describe('Tag Reducer', function () {
  const initialState = {
    list: []
  }
  const altState = {
    list: [1, 2]
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getListIds', function () {
    expect(fromTag.getListIds()).toEqual([])
    expect(fromTag.getListIds(initialState)).toEqual(initialState.list)
    expect(fromTag.getListIds(altState)).toEqual(altState.list)
  })

  it('should handle FETCH_TAGS_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.FETCH_TAGS_SUCCESS, result: [1] })
    ).toEqual({
      ...initialState,
      list: [1]
    })

    expect(
      reducer({
        ...initialState,
        list: [1]
      }, {
        type: types.FETCH_TAGS_SUCCESS,
        result: [2],
        append: true
      })
    ).toEqual({
      ...initialState,
      list: [1, 2]
    })
  })
})
