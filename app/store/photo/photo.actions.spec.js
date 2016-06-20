import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './photo.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Photo Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('searchPhotos', function () {
    it('should search photos', function () {
      nock(apiUrl).get('/photos/search?q=test&limit=20').reply(200, [{ id: 1 }])

      return store.dispatch(actions.searchPhotos({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.SEARCH_PHOTOS_REQUEST,
          params: { q: 'test', limit: 20 }
        }, {
          type: actions.SEARCH_PHOTOS_SUCCESS,
          result: [1],
          entities: { photos: { 1: { id: 1 } } }
        }])
      })
    })

    it('should search photos by limit', function () {
      nock(apiUrl).get('/photos/search?q=test&limit=30').reply(200, [{ id: 1 }])

      return store.dispatch(actions.searchPhotos({ q: 'test', limit: 30 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.SEARCH_PHOTOS_REQUEST,
          params: { q: 'test', limit: 30 }
        }, {
          type: actions.SEARCH_PHOTOS_SUCCESS,
          result: [1],
          entities: { photos: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not search photos if it is already searching', function () {
      nock(apiUrl).get('/photos/search?q=test&limit=20').reply(200, [{ id: 1 }])

      store = mockStore({ status: { loading: { [actions.SEARCH_PHOTOS]: true } } })

      return store.dispatch(actions.searchPhotos({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should search photos with error', function () {
      nock(apiUrl).get('/photos/search?q=test&limit=20').reply(500)

      return store.dispatch(actions.searchPhotos({ q: 'test' })).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.SEARCH_PHOTOS_REQUEST,
          params: { q: 'test', limit: 20 }
        }, {
          type: actions.SEARCH_PHOTOS_FAILURE
        }])
      })
    })
  })

  describe('selectPhoto', function () {
    it('should select photo', function () {
      store.dispatch(actions.selectPhoto(1))
      expect(store.getActions()).toEqual([{
        type: actions.SELECT_PHOTO,
        id: 1
      }])
    })

    it('should deselect photo', function () {
      store.dispatch(actions.deselectPhoto(1))
      expect(store.getActions()).toEqual([{ type: actions.DESELECT_PHOTO }])
    })
  })
})
