import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './session.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Session Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore({ session: {} })
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('createSession', function () {
    it('should create session', function () {
      nock(apiUrl).post('/sessions').reply(201, { token: 1 })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(api.defaults.headers.common['Authorization']).toEqual('Bearer 1')
      })
    })

    it('should throw an error when creating session without session state', function () {
      try {
        mockStore().dispatch(actions.createSession())
        expect(true).toBe(false, 'Expected to fail')
      } catch (error) {
        expect(error.message).toEqual('There is no session state')
      }
    })

    it('should return current session', function () {
      store = mockStore({ session: { token: 1 } })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(api.defaults.headers.common['Authorization']).toEqual('Bearer 1')
      })
    })

    it('should create session with error', function () {
      nock(apiUrl).post('/sessions').reply(500)

      return store.dispatch(actions.createSession()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION },
          { type: actions.CREATE_SESSION_FAILURE }
        ])
      })
    })
  })

  describe('removeSession', function () {
    it('should remove session', function () {
      nock(apiUrl).delete('/sessions/1').reply(204)

      return store.dispatch(actions.removeSession(1)).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_SESSION },
          { type: actions.REMOVE_SESSION_SUCCESS }
        ])
      })
    })

    it('should remove current session', function () {
      nock(apiUrl).delete('/sessions/1').reply(204)

      store = mockStore({ session: { token: 1 } })

      return store.dispatch(actions.removeSession()).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_SESSION },
          { type: actions.REMOVE_SESSION_SUCCESS }
        ])
      })
    })

    it('should throw an error when removing session without session state', function () {
      try {
        mockStore().dispatch(actions.removeSession())
        expect(true).toBe(false, 'Expected to fail')
      } catch (error) {
        expect(error.message).toEqual('There is no session.token state')
      }
    })

    it('should remove session with error', function () {
      nock(apiUrl).delete('/sessions/1').reply(500)

      return store.dispatch(actions.removeSession(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_SESSION },
          { type: actions.REMOVE_SESSION_FAILURE }
        ])
      })
    })
  })
})
