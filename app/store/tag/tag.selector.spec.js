import expect from 'expect'
import * as selectors from './tag.selector'

describe('Tag Selector', function () {
  let state

  beforeEach(function () {
    state = {
      entities: {
        tags: { 1: { id: 1 }, 2: { id: 2 } }
      },
      tag: { items: [1, 2] }
    }
  })

  it('should getTags', function () {
    selectors.getTags.resetRecomputations()
    expect(selectors.getTags(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getTags(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getTags.recomputations()).toEqual(1)
  })

  it('should getSortedTags', function () {
    state = {
      entities: {
        tags: { 1: { id: 1, count: 1 }, 2: { id: 2, count: 5 }, 3: { id: 3, count: 2 } }
      },
      tag: { items: [1, 2, 3] }
    }

    selectors.getSortedTags.resetRecomputations()
    expect(selectors.getSortedTags(state).map((tag) => tag.count)).toEqual([1, 2, 5])
    expect(selectors.getSortedTags(state).map((tag) => tag.count)).toEqual([1, 2, 5])
    expect(selectors.getSortedTags.recomputations()).toEqual(1)
  })
})
