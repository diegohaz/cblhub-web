import expect from 'expect'
import { LOCATION_CHANGE } from 'react-router-redux'
import reducer, * as fromPhoto from './photo.reducer'
import * as types from './photo.actions'

describe('Photo Reducer', function () {
  const initialState = {
    selected: null,
    list: []
  }

  const altState = {
    selected: 2,
    list: [1, 2]
  }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getSelectedId', function () {
    expect(fromPhoto.getSelectedId()).toNotExist()
    expect(fromPhoto.getSelectedId(initialState)).toEqual(initialState.selected)
    expect(fromPhoto.getSelectedId(altState)).toEqual(altState.selected)
  })

  it('should getListIds', function () {
    expect(fromPhoto.getListIds()).toEqual([])
    expect(fromPhoto.getListIds(initialState)).toEqual(initialState.list)
    expect(fromPhoto.getListIds(altState)).toEqual(altState.list)
  })

  it('should handle SEARCH_PHOTOS_REQUEST', function () {
    expect(reducer(altState, { type: types.SEARCH_PHOTOS_REQUEST })).toEqual(initialState)
  })

  it('should handle SEARCH_PHOTOS_SUCCESS', function () {
    expect(
      reducer(initialState, { type: types.SEARCH_PHOTOS_SUCCESS, result: [1] })
    ).toEqual({
      ...initialState,
      list: [1]
    })
  })

  it('should handle RESET_PHOTOS', function () {
    expect(
      reducer(altState, { type: types.RESET_PHOTOS, id: 1 })
    ).toEqual(initialState)
  })

  it('should handle LOCATION_CHANGE', function () {
    expect(
      reducer(altState, { type: LOCATION_CHANGE })
    ).toEqual(initialState)
  })

  it('should handle SELECT_PHOTO', function () {
    expect(
      reducer(initialState, { type: types.SELECT_PHOTO, id: 1 })
    ).toEqual({
      ...initialState,
      selected: 1
    })
  })

  it('should handle DESELECT_PHOTO', function () {
    expect(
      reducer(altState, { type: types.DESELECT_PHOTO })
    ).toEqual({
      ...altState,
      selected: null
    })
  })
})
