import expect from 'expect'
import * as selectors from './guide.selector'

describe('Guide Selector', function () {
  let state

  beforeEach(function () {
    state = {
      entities: {
        guides: { 1: { id: 1 }, 2: { id: 2 } }
      },
      guide: { item: 1, items: [1, 2] }
    }
  })

  it('should getGuide', function () {
    selectors.getGuide.resetRecomputations()
    expect(selectors.getGuide(state)).toEqual({ id: 1 })
    expect(selectors.getGuide(state)).toEqual({ id: 1 })
    expect(selectors.getGuide.recomputations()).toEqual(1)
  })

  it('should getGuides', function () {
    selectors.getGuides.resetRecomputations()
    expect(selectors.getGuides(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getGuides(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getGuides.recomputations()).toEqual(1)
  })
})
