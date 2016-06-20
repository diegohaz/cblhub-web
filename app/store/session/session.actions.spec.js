import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect, { spyOn } from 'expect'
import cookie from 'react-cookie'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './session.actions'
import { REMOVE_ME } from '../user/user.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Session Actions', function () {
  let store, saveCookie, removeCookie

  beforeEach(function () {
    expect.restoreSpies()
    store = mockStore({ session: {} })
    saveCookie = spyOn(cookie, 'save')
    removeCookie = spyOn(cookie, 'remove')
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('createSession', function () {
    it('should create session', function () {
      nock(apiUrl).post('/sessions').reply(201, { token: 1 })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION_REQUEST },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(api.defaults.headers.common['Authorization']).toEqual('Bearer 1')
        expect(saveCookie).toHaveBeenCalledWith('token', 1)
      })
    })

    it('should not create session if it is already creating', function () {
      nock(apiUrl).post('/sessions').reply(201, { token: 1 })

      store = mockStore({ status: { loading: { [actions.CREATE_SESSION]: true } } })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([])
        expect(saveCookie).toNotHaveBeenCalled()
      })
    })

    it('should return current session', function () {
      store = mockStore({ session: { token: 1 } })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION_REQUEST },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(api.defaults.headers.common['Authorization']).toEqual('Bearer 1')
        expect(saveCookie).toHaveBeenCalledWith('token', 1)
      })
    })

    it('should create session with error', function () {
      nock(apiUrl).post('/sessions').reply(500)

      return store.dispatch(actions.createSession()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION_REQUEST },
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
          { type: actions.REMOVE_SESSION_REQUEST },
          { type: REMOVE_ME },
          { type: actions.REMOVE_SESSION_SUCCESS }
        ])
        expect(api.defaults.headers.common['Authorization']).toNotExist()
        expect(removeCookie).toHaveBeenCalledWith('token')
      })
    })

    it('should not remove session if it is already removing', function () {
      nock(apiUrl).delete('/sessions/1').reply(204)

      store = mockStore({ status: { loading: { [actions.REMOVE_SESSION]: true } } })

      return store.dispatch(actions.removeSession(1)).then(() => {
        expect(store.getActions()).toEqual([])
        expect(removeCookie).toNotHaveBeenCalled()
      })
    })

    it('should remove current session', function () {
      nock(apiUrl).delete('/sessions/1').reply(204)

      store = mockStore({ session: { token: 1 } })

      return store.dispatch(actions.removeSession()).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_SESSION_REQUEST },
          { type: REMOVE_ME },
          { type: actions.REMOVE_SESSION_SUCCESS }
        ])
        expect(api.defaults.headers.common['Authorization']).toNotExist()
        expect(removeCookie).toHaveBeenCalledWith('token')
      })
    })

    it('should remove session with error', function () {
      nock(apiUrl).delete('/sessions/1').reply(500)

      return store.dispatch(actions.removeSession(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_SESSION_REQUEST },
          { type: REMOVE_ME },
          { type: actions.REMOVE_SESSION_FAILURE }
        ])
        expect(api.defaults.headers.common['Authorization']).toNotExist()
        expect(removeCookie).toHaveBeenCalledWith('token')
      })
    })
  })
})
