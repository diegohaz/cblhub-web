import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api from '../../services/api'
import { apiUrl } from '../../config'
import * as actions from './guide.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Guide Actions', function () {
  let store

  beforeEach(function () {
    store = mockStore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  describe('fetchGuides', function () {
    it('should fetch guides', function () {
      nock(apiUrl).get('/guides').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by q', function () {
      nock(apiUrl).get('/guides?q=test').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ q: 'test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { q: 'test' }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by user', function () {
      nock(apiUrl).get('/guides?user=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ user: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { user: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by challenge', function () {
      nock(apiUrl).get('/guides?challenge=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ challenge: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { challenge: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by guide', function () {
      nock(apiUrl).get('/guides?guide=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ guide: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { guide: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by type', function () {
      nock(apiUrl).get('/guides?type=Question').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ type: 'Question' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { type: 'Question' }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by page', function () {
      nock(apiUrl).get('/guides?page=2').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ page: 2 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { page: 2 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: true,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by limit', function () {
      nock(apiUrl).get('/guides?limit=1').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ limit: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { limit: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides by sort', function () {
      nock(apiUrl).get('/guides?sort=title').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({ sort: 'title' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { sort: 'title' }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guides appending', function () {
      nock(apiUrl).get('/guides').reply(200, [{ id: 1 }])

      return store.dispatch(actions.fetchGuides({}, true)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: true,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch guides if it is already fetching', function () {
      nock(apiUrl).get('/guides').reply(200, [{ id: 1 }])

      store = mockStore({ status: { loading: { [actions.FETCH_GUIDES]: true } } })

      return store.dispatch(actions.fetchGuides({}, true)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch guides with error', function () {
      nock(apiUrl).get('/guides').reply(500)

      return store.dispatch(actions.fetchGuides()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: {}
        }, {
          type: actions.FETCH_GUIDES_FAILURE
        }])
      })
    })
  })

  describe('fetchChallengeGuides', function () {
    it('should fetch challenge guides', function () {
      nock(apiUrl).get('/guides?challenge=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { challenges: { 1: { id: 1 } } }, challenge: { active: 1 } })

      return store.dispatch(actions.fetchChallengeGuides()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { challenge: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch challenge guides by user', function () {
      nock(apiUrl).get('/guides?challenge=1&user=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { challenges: { 1: { id: 1 } } }, challenge: { active: 1 } })

      return store.dispatch(actions.fetchChallengeGuides({ user: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { challenge: 1, user: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })
  })

  describe('fetchGuideGuides', function () {
    it('should fetch guide guides', function () {
      nock(apiUrl).get('/guides?guide=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { guides: { 1: { id: 1 } } }, guide: { active: 1 } })

      return store.dispatch(actions.fetchGuideGuides()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { guide: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch guide guides by user', function () {
      nock(apiUrl).get('/guides?guide=1&user=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { guides: { 1: { id: 1 } } }, guide: { active: 1 } })

      return store.dispatch(actions.fetchGuideGuides({ user: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { guide: 1, user: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })
  })

  describe('fetchUserGuides', function () {
    it('should fetch user guides', function () {
      nock(apiUrl).get('/guides?user=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { users: { 1: { id: 1 } } }, user: { active: 1 } })

      return store.dispatch(actions.fetchUserGuides()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { user: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch user guides by challenge', function () {
      nock(apiUrl).get('/guides?user=1&challenge=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { users: { 1: { id: 1 } } }, user: { active: 1 } })

      return store.dispatch(actions.fetchUserGuides({ challenge: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { user: 1, challenge: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })
  })

  describe('fetchMyGuides', function () {
    it('should fetch my guides', function () {
      nock(apiUrl).get('/guides?user=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { users: { 1: { id: 1 } } }, user: { current: 1 } })

      return store.dispatch(actions.fetchMyGuides()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { user: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should fetch my guides by challenge', function () {
      nock(apiUrl).get('/guides?user=1&challenge=1').reply(200, [{ id: 1 }])

      store = mockStore({ entities: { users: { 1: { id: 1 } } }, user: { current: 1 } })

      return store.dispatch(actions.fetchMyGuides({ challenge: 1 })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDES_REQUEST,
          params: { user: 1, challenge: 1 }
        }, {
          type: actions.FETCH_GUIDES_SUCCESS,
          result: [1],
          append: false,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })
  })

  describe('fetchGuide', function () {
    it('should fetch guide', function () {
      nock(apiUrl).get('/guides/1').reply(200, { id: 1 })

      return store.dispatch(actions.fetchGuide(1)).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDE_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_GUIDE_SUCCESS,
          result: 1,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not fetch guide if it is already fetching', function () {
      nock(apiUrl).get('/guides/1').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.FETCH_GUIDE]: true } } })

      return store.dispatch(actions.fetchGuide(1)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should fetch guide with error', function () {
      nock(apiUrl).get('/guides/1').reply(500)

      return store.dispatch(actions.fetchGuide(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.FETCH_GUIDE_REQUEST,
          id: 1
        }, {
          type: actions.FETCH_GUIDE_FAILURE
        }])
      })
    })
  })

  describe('createGuide', function () {
    it('should create guide', function () {
      nock(apiUrl).post('/guides').reply(201, { id: 1 })

      return store.dispatch(actions.createGuide()).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.CREATE_GUIDE_REQUEST
        }, {
          type: actions.CREATE_GUIDE_SUCCESS,
          result: 1,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })

    it('should not create guide if it is already creating', function () {
      nock(apiUrl).post('/guides').reply(201, { id: 1 })

      store = mockStore({ status: { loading: { [actions.CREATE_GUIDE]: true } } })

      return store.dispatch(actions.createGuide()).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should create guide with error', function () {
      nock(apiUrl).post('/guides').reply(500)

      return store.dispatch(actions.createGuide()).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.CREATE_GUIDE_REQUEST },
          { type: actions.CREATE_GUIDE_FAILURE }
        ])
      })
    })
  })

  describe('updateGuide', function () {
    it('should update guide', function () {
      nock(apiUrl).put('/guides/1').reply(200, { id: 1, title: 'Test' })

      store = mockStore({ entities: { guides: { 1: { id: 1 } } } })

      return store.dispatch(actions.updateGuide({ id: 1, title: 'Test' })).then(() => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_GUIDE_REQUEST,
          entities: { guides: { 1: { id: 1, title: 'Test' } } }
        }, {
          type: actions.UPDATE_GUIDE_SUCCESS,
          entities: { guides: { 1: { id: 1, title: 'Test' } } }
        }])
      })
    })

    it('should not update guide if it is already updating', function () {
      nock(apiUrl).put('/guides/1').reply(200, { id: 1 })

      store = mockStore({ status: { loading: { [actions.UPDATE_GUIDE]: true } } })

      return store.dispatch(actions.updateGuide({ id: 1 })).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should put guide with error', function () {
      nock(apiUrl).put('/guides').reply(500)

      store = mockStore({ entities: { guides: { 1: { id: 1 } } } })
      store = mockStore({ entities: { guides: { 1: { id: 1 } } } })

      return store.dispatch(actions.updateGuide({ id: 1, title: 'Test' })).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([{
          type: actions.UPDATE_GUIDE_REQUEST,
          entities: { guides: { 1: { id: 1, title: 'Test' } } }
        }, {
          type: actions.UPDATE_GUIDE_FAILURE,
          entities: { guides: { 1: { id: 1 } } }
        }])
      })
    })
  })

  describe('removeGuide', function () {
    it('should remove guide', function () {
      nock(apiUrl).delete('/guides/1').reply(204)

      return store.dispatch(actions.removeGuide(1)).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_GUIDE_REQUEST, id: 1 },
          { type: actions.REMOVE_GUIDE_SUCCESS, id: 1 }
        ])
      })
    })

    it('should not remove guide if it is already removing', function () {
      nock(apiUrl).delete('/guides/1').reply(204)

      store = mockStore({ status: { loading: { [actions.REMOVE_GUIDE]: true } } })

      return store.dispatch(actions.removeGuide(1)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })

    it('should remove guide with error', function () {
      nock(apiUrl).delete('/guides/1').reply(500)

      return store.dispatch(actions.removeGuide(1)).then(() => {
        expect(true).toBe(false, 'Expected to fail')
      }, () => {
        expect(store.getActions()).toEqual([
          { type: actions.REMOVE_GUIDE_REQUEST, id: 1 },
          { type: actions.REMOVE_GUIDE_FAILURE, id: 1 }
        ])
      })
    })
  })
})
