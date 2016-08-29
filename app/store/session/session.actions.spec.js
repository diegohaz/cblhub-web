import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect, { spyOn } from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './session.actions'
import { REMOVE_ME } from '../user/user.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Session Actions', function () {
  let store, setToken, unsetToken

  beforeEach(function () {
    expect.restoreSpies()
    store = mockStore({ session: {} })
    setToken = spyOn(api, 'setToken')
    unsetToken = spyOn(api, 'unsetToken')
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
        expect(setToken).toHaveBeenCalledWith(1)
      })
    })

    it('should not create session if it is already creating', function () {
      nock(apiUrl).post('/sessions').reply(201, { token: 1 })

      store = mockStore({ status: { loading: { [actions.CREATE_SESSION]: true } } })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([])
        expect(setToken).toNotHaveBeenCalled()
      })
    })

    it('should return current session', function () {
      store = mockStore({ session: { token: 1 } })

      return store.dispatch(actions.createSession('name', 'password')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION_REQUEST },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(setToken).toHaveBeenCalledWith(1)
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

  describe('createFacebookSession', function () {
    it('should create facebook session', function () {
      nock(apiUrl).post('/sessions/facebook').reply(201, { token: 1 })

      return store.dispatch(actions.createFacebookSession('123')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION_REQUEST },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(setToken).toHaveBeenCalledWith(1)
      })
    })

    it('should not create facebook session if it is already creating', function () {
      nock(apiUrl).post('/sessions/facebook').reply(201, { token: 1 })

      store = mockStore({ status: { loading: { [actions.CREATE_SESSION]: true } } })

      return store.dispatch(actions.createFacebookSession('123')).then(() => {
        expect(store.getActions()).toEqual([])
        expect(setToken).toNotHaveBeenCalled()
      })
    })

    it('should return current session', function () {
      store = mockStore({ session: { token: 1 } })

      return store.dispatch(actions.createFacebookSession('123')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_SESSION_REQUEST },
          { type: actions.CREATE_SESSION_SUCCESS, token: 1 }
        ])
        expect(setToken).toHaveBeenCalledWith(1)
      })
    })

    it('should create facebook session with error', function () {
      nock(apiUrl).post('/sessions/facebook').reply(500)

      return store.dispatch(actions.createFacebookSession()).then(() => {
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
        expect(unsetToken).toHaveBeenCalled()
      })
    })

    it('should not remove session if it is already removing', function () {
      nock(apiUrl).delete('/sessions/1').reply(204)

      store = mockStore({ status: { loading: { [actions.REMOVE_SESSION]: true } } })

      return store.dispatch(actions.removeSession(1)).then(() => {
        expect(store.getActions()).toEqual([])
        expect(unsetToken).toNotHaveBeenCalled()
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
        expect(unsetToken).toHaveBeenCalled()
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
        expect(unsetToken).toHaveBeenCalled()
      })
    })
  })
})
