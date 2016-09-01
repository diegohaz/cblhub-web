import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './password-reset.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('PasswordReset Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('createPasswordReset', function () {
    it('should create passwordReset', function () {
      nock(apiUrl).post('/password-resets').reply(202)

      return store.dispatch(actions.createPasswordReset('a@a.com')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_PASSWORD_RESET_REQUEST },
          { type: actions.CREATE_PASSWORD_RESET_SUCCESS }
        ])
      })
    })

    it('should not create passwordReset if it is already creating', function () {
      nock(apiUrl).post('/password-resets').reply(202)

      store = mockStore({ status: { loading: { [actions.CREATE_PASSWORD_RESET]: true } } })

      return store.dispatch(actions.createPasswordReset('a@a.com')).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should create passwordReset with error', function () {
      nock(apiUrl).post('/password-resets').reply(500)

      return store.dispatch(actions.createPasswordReset()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_PASSWORD_RESET_REQUEST },
          { type: actions.CREATE_PASSWORD_RESET_FAILURE }
        ])
      })
    })
  })

  describe('fetchPaswordReset', function () {
    it('should fetch passwordReset', function () {
      nock(apiUrl).get('/password-resets/123').reply(200)

      return store.dispatch(actions.fetchPasswordReset('123')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_PASSWORD_RESET_REQUEST },
          { type: actions.FETCH_PASSWORD_RESET_SUCCESS }
        ])
      })
    })

    it('should not fetch passwordReset if it is already fetching', function () {
      nock(apiUrl).get('/password-resets/123').reply(200)

      store = mockStore({ status: { loading: { [actions.FETCH_PASSWORD_RESET]: true } } })

      return store.dispatch(actions.fetchPasswordReset('123')).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch passwordReset with error', function () {
      nock(apiUrl).get('/password-resets/123').reply(500)

      return store.dispatch(actions.fetchPasswordReset('123')).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.FETCH_PASSWORD_RESET_REQUEST },
          { type: actions.FETCH_PASSWORD_RESET_FAILURE }
        ])
      })
    })
  })

  describe('updatePasswordReset', function () {
    it('should update passwordReset', function () {
      nock(apiUrl).put('/password-resets/123').reply(200)

      return store.dispatch(actions.updatePasswordReset('123', { password: '123' })).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.UPDATE_PASSWORD_RESET_REQUEST },
          { type: actions.UPDATE_PASSWORD_RESET_SUCCESS }
        ])
      })
    })

    it('should not update passwordReset if it is already updating', function () {
      nock(apiUrl).put('/password-resets/123').reply(200)

      store = mockStore({ status: { loading: { [actions.UPDATE_PASSWORD_RESET]: true } } })

      return store.dispatch(actions.updatePasswordReset('123', { password: '123' })).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should update passwordReset with error', function () {
      nock(apiUrl).put('/password-resets/123').reply(500)

      return store.dispatch(actions.updatePasswordReset('123', { password: '123' })).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.UPDATE_PASSWORD_RESET_REQUEST },
          { type: actions.UPDATE_PASSWORD_RESET_FAILURE }
        ])
      })
    })
  })
})
