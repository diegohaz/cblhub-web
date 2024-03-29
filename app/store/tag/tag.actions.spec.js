import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './tag.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Tag Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('fetchTags', function () {
    it('should fetch tags', function () {
      nock(apiUrl).get('/tags').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTags()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: false,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch tags by q', function () {
      nock(apiUrl).get('/tags?q=test').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTags({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: { q: 'test' }
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: false,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch tags by page', function () {
      nock(apiUrl).get('/tags?page=2').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTags({ page: 2 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: { page: 2 }
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: true,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch tags by limit', function () {
      nock(apiUrl).get('/tags?limit=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTags({ limit: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: { limit: 1 }
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: false,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch tags by sort', function () {
      nock(apiUrl).get('/tags?sort=title').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTags({ sort: 'title' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: { sort: 'title' }
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: false,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch tags appending', function () {
      nock(apiUrl).get('/tags').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTags({}, true)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: true,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch tags if it is already fetching', function () {
      nock(apiUrl).get('/tags').reply(200, [{ id: 1 }])

      store = mockStore({ status: { loading: { [actions.FETCH_TAGS]: true } } })

      return store.dispatch(actions.fetchTags()).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch tags with error', function () {
      nock(apiUrl).get('/tags').reply(500)

      return store.dispatch(actions.fetchTags()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_TAGS_FAILURE
        }])
      })
    })
  })

  describe('fetchTagsByCount', function () {
    it('shout fetch tags by count', function () {
      nock(apiUrl).get('/tags?limit=1000&sort=count').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTagsByCount()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: { limit: 1000, sort: 'count' }
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: false,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('shout fetch tags by count and q', function () {
      nock(apiUrl).get('/tags?limit=1000&sort=count&q=test').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchTagsByCount({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAGS_REQUEST,
          params: { q: 'test', limit: 1000, sort: 'count' }
        }, {
          type: actions.FETCH_TAGS_SUCCESS,
          result: [1],
          append: false,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })
  })

  describe('fetchTag', function () {
    it('should fetch tag', function () {
      nock(apiUrl).get('/tags/1').reply(200, { id: 1 })

      return store.dispatch(actions.fetchTag(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAG_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_TAG_SUCCESS,
          result: 1,
          entities: { tags: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch tag if it is already fetching', function () {
      nock(apiUrl).get('/tags/1').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.FETCH_TAG]: true } } })

      return store.dispatch(actions.fetchTag(1)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch tag with error', function () {
      nock(apiUrl).get('/tags/1').reply(500)

      return store.dispatch(actions.fetchTag(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_TAG_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_TAG_FAILURE
        }])
      })
    })
  })
})
