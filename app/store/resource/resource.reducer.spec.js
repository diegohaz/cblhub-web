import expect from 'expect'
import reducer from './resource.reducer'
import * as types from './resource.actions'

describe('Resource Reducer', function () {
  it('should return the initial state', function () {
    const initialState = {
      data: null,
      loading: false,
      error: false
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_META', function () {
    expect(
      reducer({}, { type: types.FETCH_META, url: 'test' })
    ).toEqual({
      loading: true,
      error: false
    })
  })

  it('should handle FETCH_META_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_META_SUCCESS, data: { title: 'test' } })
    ).toEqual({
      data: { title: 'test' },
      loading: false
    })
  })

  it('should handle FETCH_META_FAILURE', function () {
    expect(
      reducer({}, { type: types.FETCH_META_FAILURE })
    ).toEqual({
      loading: false,
      error: true
    })
  })
})
