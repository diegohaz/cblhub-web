import expect from 'expect'
import _ from 'lodash'
import * as store from './'

describe('Store', function () {
  const stateSelectors = {
    getEntitiesState: 'entities',
    getChallengeState: 'challenge',
    getGuideState: 'guide',
    getPhotoState: 'photo',
    getResourceState: 'resource',
    getSessionState: 'session',
    getTagState: 'tag',
    getUserState: 'user'
  }

  const state = {
    entities: {
      challenges: {
        1: { id: 1 },
        2: { id: 2, guides: [1, 2, 4] }
      },
      guides: {
        1: { id: 1, type: 'Question' },
        2: { id: 2, type: 'Activity' },
        3: { id: 3, type: 'Resource' },
        4: { id: 4, type: 'Activity' }
      },
      photos: {
        1: { id: 1 },
        2: { id: 2 }
      },
      tags: {
        1: { id: 1 },
        2: { id: 2 }
      },
      users: {
        1: { id: 1 },
        2: { id: 2 }
      }
    },
    challenge: {
      item: 2,
      items: [1, 2]
    },
    guide: {
      item: 1,
      items: [1, 2]
    },
    photo: {
      selected: 1,
      items: [2, 1]
    },
    tag: {
      items: [2, 1]
    },
    user: {
      me: 2
    }
  }

  _.forIn(stateSelectors, (field, selector) => {
    it(`should ${selector}`, function () {
      expect(store[selector]()).toEqual({})
      expect(store[selector]({ [field]: { 1: 1 } })).toEqual({ 1: 1 })
    })
  })

  it('should getSelectedPhoto', function () {
    expect(store.fromPhoto.getSelectedPhoto()).toNotExist()
    expect(store.fromPhoto.getSelectedPhoto(state)).toEqual({ id: 1 })
  })

  it('should getCurrentPhotos', function () {
    expect(store.fromPhoto.getCurrentPhotos()).toEqual([])
    expect(store.fromPhoto.getCurrentPhotos(state)).toEqual([{ id: 2 }, { id: 1 }])
  })

  it('should getCurrentTags', function () {
    expect(store.fromTag.getCurrentTags()).toEqual([])
    expect(store.fromTag.getCurrentTags(state)).toEqual([{ id: 2 }, { id: 1 }])
  })

  it('should getMe', function () {
    expect(store.fromUser.getMe()).toNotExist()
    expect(store.fromUser.getMe(state)).toEqual({ id: 2 })
  })

  it('should getChallenge', function () {
    expect(store.fromChallenge.getChallenge()).toNotExist()
    expect(store.fromChallenge.getChallenge(state, 1)).toEqual({ id: 1 })
  })

  it('should getCurrentChallenge', function () {
    expect(store.fromChallenge.getCurrentChallenge()).toNotExist()
    expect(store.fromChallenge.getCurrentChallenge(state)).toEqual({
      id: 2,
      guides: [
        { id: 1, type: 'Question' },
        { id: 2, type: 'Activity' },
        { id: 4, type: 'Activity' }
      ]
    })
  })

  it('should getCurrentChallenges', function () {
    expect(store.fromChallenge.getCurrentChallenges()).toEqual([])
    expect(store.fromChallenge.getCurrentChallenges(state)).toEqual([{
      id: 1
    }, {
      id: 2,
      guides: [
        { id: 1, type: 'Question' },
        { id: 2, type: 'Activity' },
        { id: 4, type: 'Activity' }
      ]
    }])
  })

  it('should getCurrentChallengeQuestions', function () {
    expect(store.fromChallenge.getCurrentChallengeQuestions()).toEqual([])
    expect(store.fromChallenge.getCurrentChallengeQuestions(state)).toEqual([{
      id: 1,
      type: 'Question'
    }])
  })

  it('should getCurrentChallengeActivities', function () {
    expect(store.fromChallenge.getCurrentChallengeActivities()).toEqual([])
    expect(store.fromChallenge.getCurrentChallengeActivities(state)).toEqual([
      { id: 2, type: 'Activity' },
      { id: 4, type: 'Activity' }
    ])
  })

  it('should getCurrentChallengeResources', function () {
    expect(store.fromChallenge.getCurrentChallengeResources()).toEqual([])
    expect(store.fromChallenge.getCurrentChallengeResources(state)).toEqual([])
  })

  it('should getGuide', function () {
    expect(store.fromGuide.getGuide()).toNotExist()
    expect(store.fromGuide.getGuide(state, 1)).toEqual({ id: 1, type: 'Question' })
  })

  it('should getCurrentGuide', function () {
    expect(store.fromGuide.getCurrentGuide()).toNotExist()
    expect(store.fromGuide.getCurrentGuide(state)).toEqual({ id: 1, type: 'Question' })
  })

  it('should getCurrentGuides', function () {
    expect(store.fromGuide.getCurrentGuides()).toEqual([])
    expect(store.fromGuide.getCurrentGuides(state)).toEqual([
      { id: 1, type: 'Question' },
      { id: 2, type: 'Activity' }
    ])
  })
})
