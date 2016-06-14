import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import api, { url } from '../../services/api'
import * as actions from './challenge.actions'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('Challenge Store', function () {
  afterEach(function () {
    nock.cleanAll()
  })

  describe('Challenge Actions', function () {
    it('should get challenges', function () {
      nock(url).get('/challenges').reply(200, [{ id: 1 }])

      const expectedActions = [{
        type: actions.REQUEST_CHALLENGES,
        params: {}
      }, {
        type: actions.REQUEST_CHALLENGES_SUCCESS,
        result: [1],
        append: false,
        entities: {
          challenges: {
            1: {
              id: 1
            }
          }
        }
      }]

      const store = mockStore({})

      return store.dispatch(actions.getChallenges())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
