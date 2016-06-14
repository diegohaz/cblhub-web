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

  describe('getUser', function () {
    it('should get user', function () {
      nock(apiUrl).get('/users/1').reply(200, { id: 1 })

      return store.dispatch(actions.getUser(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_USER,
          id: 1
        }, {
          type: actions.REQUEST_USER_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get cached user', function () {
      nock(apiUrl).get('/users/1').reply(200, { id: 1 })

      store = mockStore({ entities: { users: { 1: { id: 1 } } } })

      return store.dispatch(actions.getUser(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_USER_SUCCESS,
          result: 1,
          cached: true
        }, {
          type: actions.REQUEST_USER_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get user with error', function () {
      nock(apiUrl).get('/users/1').reply(500)

      return store.dispatch(actions.getUser(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REQUEST_USER, id: 1 },
          { type: actions.REQUEST_USER_FAILURE }
        ])
      })
    })
  })

  describe('getMe', function () {
    it('should get me', function () {
      nock(apiUrl).get('/users/me').reply(200, { id: 1 })

      return store.dispatch(actions.getMe()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_ME
        }, {
          type: actions.REQUEST_ME_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get me with error', function () {
      nock(apiUrl).get('/users/me').reply(500)

      return store.dispatch(actions.getMe()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REQUEST_ME },
          { type: actions.REQUEST_ME_FAILURE }
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
          type: actions.REQUEST_ME_SUCCESS,
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
          type: actions.REQUEST_ME_FAILURE
        }])
      })
    })
  })
})
