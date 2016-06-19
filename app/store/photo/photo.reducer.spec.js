import expect from 'expect'
import reducer, * as fromPhoto from './photo.reducer'
import * as types from './photo.actions'

describe('Photo Reducer', function () {
  it('should return the initial state', function () {
    const initialState = {
      selected: null,
      items: [],
      loading: false,
      error: false
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getSelectedId', function () {
    expect(fromPhoto.getSelectedId()).toNotExist()
    expect(fromPhoto.getSelectedId({ selected: 1 })).toEqual(1)
  })

  it('should getCurrentIds', function () {
    expect(fromPhoto.getCurrentIds()).toEqual([])
    expect(fromPhoto.getCurrentIds({ items: [1, 2] })).toEqual([1, 2])
  })

  it('should getIsLoading', function () {
    expect(fromPhoto.getIsLoading()).toNotExist()
    expect(fromPhoto.getIsLoading({ loading: false })).toEqual(false)
    expect(fromPhoto.getIsLoading({ loading: true })).toEqual(true)
  })

  it('should getFailed', function () {
    expect(fromPhoto.getFailed()).toNotExist()
    expect(fromPhoto.getFailed({ error: false })).toEqual(false)
    expect(fromPhoto.getFailed({ error: true })).toEqual(true)
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

  it('should handle SELECT_PHOTO', function () {
    expect(
      reducer({}, { type: types.SELECT_PHOTO, id: 1 })
    ).toEqual({
      selected: 1
    })
  })

  it('should handle DESELECT_PHOTO', function () {
    expect(
      reducer({ selected: 1 }, { type: types.DESELECT_PHOTO })
    ).toEqual({
      selected: null
    })
  })
})
