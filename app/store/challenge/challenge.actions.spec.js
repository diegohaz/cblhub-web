import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api, { url } from '../../services/api'
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

  describe('getChallenges', function () {
    it('should get challenges', function () {
      nock(url).get('/challenges').reply(200, [{ id: 1 }])

      return store.dispatch(actions.getChallenges()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: {}
        }, {
          type: actions.REQUEST_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenges by q', function () {
      nock(url).get('/challenges?q=test').reply(200, [{ id: 1 }])

      return store.dispatch(actions.getChallenges({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: { q: 'test' }
        }, {
          type: actions.REQUEST_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenges by user', function () {
      nock(url).get('/challenges?user=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.getChallenges({ user: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: { user: 1 }
        }, {
          type: actions.REQUEST_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenges by page', function () {
      nock(url).get('/challenges?page=2').reply(200, [{ id: 1 }])

      return store.dispatch(actions.getChallenges({ page: 2 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: { page: 2 }
        }, {
          type: actions.REQUEST_CHALLENGES_SUCCESS,
          result: [1],
          append: true,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenges by limit', function () {
      nock(url).get('/challenges?limit=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.getChallenges({ limit: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: { limit: 1 }
        }, {
          type: actions.REQUEST_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenges by sort', function () {
      nock(url).get('/challenges?sort=title').reply(200, [{ id: 1 }])

      return store.dispatch(actions.getChallenges({ sort: 'title' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: { sort: 'title' }
        }, {
          type: actions.REQUEST_CHALLENGES_SUCCESS,
          result: [1],
          append: false,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenges with error', function () {
      nock(url).get('/challenges').reply(500)

      return store.dispatch(actions.getChallenges()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGES,
          params: {}
        }, {
          type: actions.REQUEST_CHALLENGES_FAILURE
        }])
      })
    })
  })

  describe('getChallenge', function () {
    it('should get challenge', function () {
      nock(url).get('/challenges/1').reply(200, {id: 1})

      return store.dispatch(actions.getChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGE,
          id: 1
        }, {
          type: actions.REQUEST_CHALLENGE_SUCCESS,
          result: 1,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get cached challenge', function () {
      nock(url).get('/challenges/1').reply(200, {id: 1})

      store = mockStore({ entities: { challenges: { 1: { id: 1 } } } })

      return store.dispatch(actions.getChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGE_SUCCESS,
          result: 1,
          cached: true
        }, {
          type: actions.REQUEST_CHALLENGE_SUCCESS,
          result: 1,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should get challenge with error', function () {
      nock(url).get('/challenges/1').reply(500)

      return store.dispatch(actions.getChallenge(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.REQUEST_CHALLENGE,
          id: 1
        }, {
          type: actions.REQUEST_CHALLENGE_FAILURE
        }])
      })
    })
  })

  describe('createChallenge', function () {
    it('should create challenge', function () {
      nock(url).post('/challenges').reply(201, {id: 1})

      return store.dispatch(actions.createChallenge()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.CREATE_CHALLENGE
        }, {
          type: actions.CREATE_CHALLENGE_SUCCESS,
          result: 1,
          entities: { challenges: { 1: { id: 1 } } }
        }])
      })
    })

    it('should create challenge with error', function () {
      nock(url).post('/challenges').reply(500)

      return store.dispatch(actions.createChallenge()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_CHALLENGE },
          { type: actions.CREATE_CHALLENGE_FAILURE }
        ])
      })
    })
  })

  describe('removeChallenge', function () {
    it('should remove challenge', function () {
      nock(url).delete('/challenges/1').reply(204)

      return store.dispatch(actions.removeChallenge(1)).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_CHALLENGE, id: 1 },
          { type: actions.REMOVE_CHALLENGE_SUCCESS, id: 1 }
        ])
      })
    })

    it('should remove challenge with error', function () {
      nock(url).delete('/challenges/1').reply(500)

      return store.dispatch(actions.removeChallenge(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_CHALLENGE, id: 1 },
          { type: actions.REMOVE_CHALLENGE_FAILURE, id: 1 }
        ])
      })
    })
  })
})
