import expect from 'expect'
import _ from 'lodash'
import * as selectors from './challenge.selector'

describe('Challenge Selector', function () {
  it('should getChallenge', function () {
    let state = {
      entities: {
        users: { 1: { id: 1 } },
        challenges: { 1: { id: 1, user: 1 } }
      },
      challenge: { item: 1 }
    }

    expect(selectors.getChallenge(state)).toEqual({ id: 1, user: { id: 1 } })
    expect(selectors.getChallenge(state)).toEqual({ id: 1, user: { id: 1 } })
    expect(selectors.getChallenge.recomputations()).toEqual(1)

    state = _.merge({}, state, { entities: { users: { 1: { id: 1, name: 'Test' } } } })

    expect(selectors.getChallenge(state)).toEqual({ id: 1, user: { id: 1, name: 'Test' } })
    expect(selectors.getChallenge.recomputations()).toEqual(2)
  })

  it('should getChallenges', function () {
    let state = {
      entities: {
        challenges: { 1: { id: 1 }, 2: { id: 2 } }
      },
      challenge: { items: [1, 2] }
    }

    expect(selectors.getChallenges(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getChallenges(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getChallenges.recomputations()).toEqual(1)
  })
})
