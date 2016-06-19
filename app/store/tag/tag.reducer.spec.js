import expect from 'expect'
import reducer, * as fromTag from './tag.reducer'
import * as types from './tag.actions'

describe('Tag Reducer', function () {
  it('should return the initial state', function () {
    const initialState = {
      items: [],
      loading: false,
      error: false
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getCurrentIds', function () {
    expect(fromTag.getCurrentIds()).toEqual([])
    expect(fromTag.getCurrentIds({ items: [1, 2] })).toEqual([1, 2])
  })

  it('should getIsLoading', function () {
    expect(fromTag.getIsLoading()).toNotExist()
    expect(fromTag.getIsLoading({ loading: false })).toEqual(false)
    expect(fromTag.getIsLoading({ loading: true })).toEqual(true)
  })

  it('should getFailed', function () {
    expect(fromTag.getFailed()).toNotExist()
    expect(fromTag.getFailed({ error: false })).toEqual(false)
    expect(fromTag.getFailed({ error: true })).toEqual(true)
  })

  it('should handle FETCH_TAGS', function () {
    expect(
      reducer({}, { type: types.FETCH_TAGS })
    ).toEqual({
      error: false,
      loading: true
    })
  })

  it('should handle FETCH_TAGS_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_TAGS_SUCCESS, result: [1] })
    ).toEqual({
      items: [1],
      loading: false
    })

    expect(
      reducer({ items: [1] }, { type: types.FETCH_TAGS_SUCCESS, result: [2], append: true })
    ).toEqual({
      items: [1, 2],
      loading: false
    })
  })

  it('should handle FETCH_TAGS_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_TAGS_FAILURE })
    ).toEqual({
      loading: false,
      error: true
    })
  })
})
