import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect, { spyOn } from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './user.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('User Actions', function () {
  let store, unsetToken

  beforeEach(function () {
    expect.restoreSpies()
    store = mockStore()
    unsetToken = spyOn(api, 'unsetToken')
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('fetchUser', function () {
    it('should fetch user', function () {
      nock(apiUrl).get('/users/1').reply(200, { id: 1 })

      return store.dispatch(actions.fetchUser(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_USER_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_USER_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch user if it is already fetching', function () {
      nock(apiUrl).get('/users/1').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.FETCH_USER]: true } } })

      return store.dispatch(actions.fetchUser(1)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch user with error', function () {
      nock(apiUrl).get('/users/1').reply(500)

      return store.dispatch(actions.fetchUser(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_USER_REQUEST, id: 1 },
          { type: actions.FETCH_USER_FAILURE }
        ])
      })
    })
  })

  describe('fetchMe', function () {
    it('should fetch me', function () {
      nock(apiUrl).get('/users/me').reply(200, { id: 1 })

      return store.dispatch(actions.fetchMe()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_ME_REQUEST
        }, {
          type: actions.FETCH_ME_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch me if it is already fetching', function () {
      nock(apiUrl).get('/users/me').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.FETCH_ME]: true } } })

      return store.dispatch(actions.fetchMe()).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch me with error', function () {
      nock(apiUrl).get('/users/me').reply(500)

      return store.dispatch(actions.fetchMe()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_ME_REQUEST },
          { type: actions.FETCH_ME_FAILURE }
        ])
        expect(unsetToken).toNotHaveBeenCalled()
      })
    })

    it('should fetch me with error 401', function () {
      nock(apiUrl).get('/users/me').reply(401)

      return store.dispatch(actions.fetchMe()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_ME_REQUEST },
          { type: actions.FETCH_ME_FAILURE }
        ])
        expect(unsetToken).toHaveBeenCalled()
      })
    })
  })

  describe('updateMe', function () {
    it('should update me', function () {
      nock(apiUrl).put('/users/me').reply(200, { id: 1, name: 'Diego Haz' })

      return store.dispatch(actions.updateMe({ id: 1, name: 'Diego Haz' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_ME_REQUEST,
          id: 1,
          entities: { users: { 1: { id: 1, name: 'Diego Haz' } } }
        }, {
          type: actions.UPDATE_ME_SUCCESS,
          result: 1,
          entities: { users: { 1: { id: 1, name: 'Diego Haz' } } }
        }])
      })
    })

    it('should not update me if it is already updating', function () {
      nock(apiUrl).put('/users/me').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.UPDATE_ME]: true } } })

      return store.dispatch(actions.updateMe({ id: 1 })).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should update me with error', function () {
      nock(apiUrl).put('/users/me').reply(500)

      return store.dispatch(actions.updateMe({ id: 1, name: 'Diego Haz' })).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_ME_REQUEST,
          id: 1,
          entities: { users: { 1: { id: 1, name: 'Diego Haz' } } }
        }, {
          type: actions.UPDATE_ME_FAILURE
        }])
      })
    })
  })

  describe('removeMe', function () {
    it('should remove me', function () {
      store.dispatch(actions.removeMe())
      expect(store.getActions()).toEqual([{ type: actions.REMOVE_ME }])
    })
  })
})
