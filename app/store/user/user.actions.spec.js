import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './user.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('User Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('fetchUser', function () {
    it('should get user', function () {
      nock(apiUrl).get('/users/1').reply(200, { id: 1 })

      return store.dispatch(actions.fetchUser(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_USER,
          id: 1
        }, {
          type: actions.FETCH_USER_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get cached user', function () {
      nock(apiUrl).get('/users/1').reply(200, { id: 1 })

      store = mockStore({ entities: { users: { 1: { id: 1 } } } })

      return store.dispatch(actions.fetchUser(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_USER_SUCCESS,
          result: 1,
          cached: true
        }, {
          type: actions.FETCH_USER_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get user with error', function () {
      nock(apiUrl).get('/users/1').reply(500)

      return store.dispatch(actions.fetchUser(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_USER, id: 1 },
          { type: actions.FETCH_USER_FAILURE }
        ])
      })
    })
  })

  describe('fetchMe', function () {
    it('should get me', function () {
      nock(apiUrl).get('/users/me').reply(200, { id: 1 })

      return store.dispatch(actions.fetchMe()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_ME
        }, {
          type: actions.FETCH_ME_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get me with error', function () {
      nock(apiUrl).get('/users/me').reply(500)

      return store.dispatch(actions.fetchMe()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_ME },
          { type: actions.FETCH_ME_FAILURE }
        ])
      })
    })
  })

  describe('updateMe', function () {
    it('should update me', function () {
      nock(apiUrl).put('/users/me').reply(200, { id: 1, name: 'Diego Haz' })

      return store.dispatch(actions.updateMe({ id: 1, name: 'Diego Haz' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_ME,
          result: 1,
          entities: { users: { 1: { id: 1, name: 'Diego Haz' } } }
        }, {
          type: actions.FETCH_ME_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1, name: 'Diego Haz' } } }
        }])
      })
    })

    it('should update me with error', function () {
      nock(apiUrl).put('/users/me').reply(500)

      return store.dispatch(actions.updateMe({ id: 1, name: 'Diego Haz' })).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_ME,
          result: 1,
          entities: { users: { 1: { id: 1, name: 'Diego Haz' } } }
        }, {
          type: actions.FETCH_ME_FAILURE
        }])
      })
    })
  })
})
