import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './resource.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Resource Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('fetchMeta', function () {
    it('should fetch meta', function () {
      nock(apiUrl).get('/resources/meta?url=test').reply(200, { title: 'test' })

      return store.dispatch(actions.fetchMeta('test')).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_META_REQUEST,
          url: 'test'
        }, {
          type: actions.FETCH_META_SUCCESS,
          data: { title: 'test' }
        }])
      })
    })

    it('should fetch meta with error', function () {
      nock(apiUrl).get('/resources/meta?url=test').reply(500)

      return store.dispatch(actions.fetchMeta('test')).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_META_REQUEST,
          url: 'test'
        }, {
          type: actions.FETCH_META_FAILURE
        }])
      })
    })
  })
})
