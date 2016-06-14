import expect from 'expect'
import * as selectors from './user.selector'

describe('User Selector', function () {
  let state

  beforeEach(function () {
    state = {
      entities: {
        users: { 1: { id: 1 }, 2: { id: 2 } }
      },
      user: { item: 1, me: 2 }
    }
  })

  it('should getMe', function () {
    expect(selectors.getMe(state)).toEqual({ id: 2 })
    expect(selectors.getMe(state)).toEqual({ id: 2 })
    expect(selectors.getMe.recomputations()).toEqual(1)
  })

  it('should getUser', function () {
    expect(selectors.getUser(state)).toEqual({ id: 1 })
    expect(selectors.getUser(state)).toEqual({ id: 1 })
    expect(selectors.getUser.recomputations()).toEqual(1)
  })
})
