import expect from 'expect'
import * as selectors from './photo.selector'

describe('Photo Selector', function () {
  let state

  before(function () {
    state = {
      entities: {
        photos: {
          1: { id: 1 },
          2: { id: 2 }
        }
      },
      photo: {
        items: [1, 2]
      }
    }
  })

  it('should getPhotos', function () {
    selectors.getPhotos.resetRecomputations()
    expect(selectors.getPhotos(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getPhotos(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getPhotos.recomputations()).toEqual(1)
  })
})
