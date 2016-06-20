import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import { DESELECT_PHOTO } from '../photo/photo.actions'
import * as actions from './challenge.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Challenge Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('fetchChallenges', function () {
    it('should fetch challenges', function () {
      nock(apiUrl).get('/challenges').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenges by q', function () {
      nock(apiUrl).get('/challenges?q=test').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: { q: 'test' }
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenges by user', function () {
      nock(apiUrl).get('/challenges?user=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges({ user: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: { user: 1 }
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenges by page', function () {
      nock(apiUrl).get('/challenges?page=2').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges({ page: 2 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: { page: 2 }
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: true,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenges by limit', function () {
      nock(apiUrl).get('/challenges?limit=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges({ limit: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: { limit: 1 }
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenges by sort', function () {
      nock(apiUrl).get('/challenges?sort=title').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges({ sort: 'title' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: { sort: 'title' }
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenges appending', function () {
      nock(apiUrl).get('/challenges').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchChallenges({}, true)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_CHALLENGES_SUCCESS,
          result: [1],
          append: true,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch challenges if it is already fetching ', function () {
      nock(apiUrl).get('/challenges').reply(200, [{ id: 1 }])

      store = mockStore({ status: { loading: { [actions.FETCH_CHALLENGES]: true } } })

      return store.dispatch(actions.fetchChallenges()).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch challenges with error', function () {
      nock(apiUrl).get('/challenges').reply(500)

      return store.dispatch(actions.fetchChallenges()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGES_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_CHALLENGES_FAILURE
        }])
      })
    })
  })

  describe('fetchChallenge', function () {
    it('should fetch challenge', function () {
      nock(apiUrl).get('/challenges/1').reply(200, { id: 1 })

      return store.dispatch(actions.fetchChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGE_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_CHALLENGE_SUCCESS,
          result: 1,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch challenge if it is already fetching ', function () {
      nock(apiUrl).get('/challenges/1').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.FETCH_CHALLENGE]: true } } })

      return store.dispatch(actions.fetchChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch challenge with error', function () {
      nock(apiUrl).get('/challenges/1').reply(500)

      return store.dispatch(actions.fetchChallenge(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_CHALLENGE_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_CHALLENGE_FAILURE
        }])
      })
    })
  })

  describe('createChallenge', function () {
    it('should create challenge', function () {
      nock(apiUrl).post('/challenges').reply(201, { id: 1 })

      return store.dispatch(actions.createChallenge()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.CREATE_CHALLENGE_REQUEST
        }, {
          type: actions.CREATE_CHALLENGE_SUCCESS,
          result: 1,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not create challenge if it is already creating ', function () {
      nock(apiUrl).post('/challenges').reply(201, { id: 1 })

      store = mockStore({ status: { loading: { [actions.CREATE_CHALLENGE]: true } } })

      return store.dispatch(actions.createChallenge()).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should create challenge with error', function () {
      nock(apiUrl).post('/challenges').reply(500)

      return store.dispatch(actions.createChallenge()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_CHALLENGE_REQUEST },
          { type: actions.CREATE_CHALLENGE_FAILURE }
        ])
      })
    })
  })

  describe('updateChallenge', function () {
    it('should update challenge', function () {
      nock(apiUrl).put('/challenges/1').reply(200, { id: 1, title: 'Test' })

      store = mockStore({ entities: { challenges: { 1: { id: 1 } } } })

      return store.dispatch(actions.updateChallenge({ id: 1, title: 'Test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_CHALLENGE_REQUEST,
          entities: { challenges: { 1: { id: 1, title: 'Test' } } }
        }, {
          type: actions.UPDATE_CHALLENGE_SUCCESS,
          entities: { challenges: { 1: { id: 1, title: 'Test' } } }
        }, {
          type: DESELECT_PHOTO
        }])
      })
    })

    it('should not update challenge if it is already updating ', function () {
      nock(apiUrl).put('/challenges/1').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.UPDATE_CHALLENGE]: true } } })

      return store.dispatch(actions.updateChallenge({ id: 1 })).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should update challenge with error', function () {
      nock(apiUrl).put('/challenges').reply(500)

      store = mockStore({ entities: { challenges: { 1: { id: 1 } } } })
      store = mockStore({ entities: { challenges: { 1: { id: 1 } } } })

      return store.dispatch(actions.updateChallenge({ id: 1, title: 'Test' })).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_CHALLENGE_REQUEST,
          entities: { challenges: { 1: { id: 1, title: 'Test' } } }
        }, {
          type: actions.UPDATE_CHALLENGE_FAILURE,
          entities: { challenges: { 1: { id: 1 } } }
        }, {
          type: DESELECT_PHOTO
        }])
      })
    })
  })

  describe('removeChallenge', function () {
    it('should remove challenge', function () {
      nock(apiUrl).delete('/challenges/1').reply(204)

      return store.dispatch(actions.removeChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_CHALLENGE_REQUEST, id: 1 },
          { type: actions.REMOVE_CHALLENGE_SUCCESS, id: 1 }
        ])
      })
    })

    it('should not remove challenge if it is already removing ', function () {
      nock(apiUrl).delete('/challenges/1').reply(204)

      store = mockStore({ status: { loading: { [actions.REMOVE_CHALLENGE]: true } } })

      return store.dispatch(actions.removeChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should remove challenge with error', function () {
      nock(apiUrl).delete('/challenges/1').reply(500)

      return store.dispatch(actions.removeChallenge(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_CHALLENGE_REQUEST, id: 1 },
          { type: actions.REMOVE_CHALLENGE_FAILURE, id: 1 }
        ])
      })
    })
  })
})
