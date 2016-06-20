import expect from 'expect'
import reducer, * as fromResource from './resource.reducer'
import * as types from './resource.actions'

describe('Resource Reducer', function () {
  const initialState = {}
  const altState = { title: 'test' }

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getData', function () {
    expect(fromResource.getData()).toEqual({})
    expect(fromResource.getData(initialState)).toEqual(initialState)
    expect(fromResource.getData(altState)).toEqual(altState)
  })

  it('should handle FETCH_META_SUCCESS', function () {
    expect(
      reducer({}, { type: types.FETCH_META_SUCCESS, data: { title: 'test' } })
    ).toEqual({
      title: 'test'
    })
  })
})
