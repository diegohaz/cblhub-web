import expect from 'expect'
import reducer from './photo.reducer'
import * as types from './photo.actions'

describe('Photo Reducer', function () {
  it('should return the initial state', function () {
    const initialState = {
      items: [],
      loading: false,
      error: false
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEARCH_PHOTOS', function () {
    expect(
      reducer({}, { type: types.SEARCH_PHOTOS })
    ).toEqual({
      error: false,
      loading: true
    })
  })

  it('should handle SEARCH_PHOTOS_SUCCESS', function () {
    expect(
      reducer({}, { type: types.SEARCH_PHOTOS_SUCCESS, result: [1] })
    ).toEqual({
      items: [1],
      loading: false
    })
  })

  it('should handle SEARCH_PHOTOS_FAILURE', function () {
    expect(
      reducer({}, { type: types.SEARCH_PHOTOS_FAILURE })
    ).toEqual({
      loading: false,
      error: true
    })
  })
})
