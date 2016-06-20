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
      active: 2,
      list: [1, 2]
    },
    guide: {
      active: 1,
      list: [1, 2]
    },
    photo: {
      selected: 1,
      list: [2, 1]
    },
    tag: {
      list: [2, 1]
    },
    user: {
      active: 1,
      current: 2
    }
  }

  _.forIn(stateSelectors, (field, selector) => {
    it(`should ${selector}`, function () {
      expect(store[selector]()).toEqual({})
      expect(store[selector]({ [field]: { 1: 1 } })).toEqual({ 1: 1 })
    })
  })

  it('should getChallenge', function () {
    expect(store.fromChallenge.getChallenge()).toNotExist()
    expect(store.fromChallenge.getChallenge(state, 1)).toEqual({ id: 1 })
  })

  it('should getActiveChallenge', function () {
    expect(store.fromChallenge.getActiveChallenge()).toNotExist()
    expect(store.fromChallenge.getActiveChallenge(state)).toEqual({
      id: 2,
      guides: [
        { id: 1, type: 'Question' },
        { id: 2, type: 'Activity' },
        { id: 4, type: 'Activity' }
      ]
    })
  })

  it('should getChallengeList', function () {
    expect(store.fromChallenge.getChallengeList()).toEqual([])
    expect(store.fromChallenge.getChallengeList(state)).toEqual([{
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

  it('should getActiveChallengeQuestions', function () {
    expect(store.fromChallenge.getActiveChallengeQuestions()).toEqual([])
    expect(store.fromChallenge.getActiveChallengeQuestions(state)).toEqual([{
      id: 1,
      type: 'Question'
    }])
  })

  it('should getActiveChallengeActivities', function () {
    expect(store.fromChallenge.getActiveChallengeActivities()).toEqual([])
    expect(store.fromChallenge.getActiveChallengeActivities(state)).toEqual([
      { id: 2, type: 'Activity' },
      { id: 4, type: 'Activity' }
    ])
  })

  it('should getActiveChallengeResources', function () {
    expect(store.fromChallenge.getActiveChallengeResources()).toEqual([])
    expect(store.fromChallenge.getActiveChallengeResources(state)).toEqual([])
  })

  it('should getGuide', function () {
    expect(store.fromGuide.getGuide()).toNotExist()
    expect(store.fromGuide.getGuide(state, 1)).toEqual({ id: 1, type: 'Question' })
  })

  it('should getActiveGuide', function () {
    expect(store.fromGuide.getActiveGuide()).toNotExist()
    expect(store.fromGuide.getActiveGuide(state)).toEqual({ id: 1, type: 'Question' })
  })

  it('should getGuideList', function () {
    expect(store.fromGuide.getGuideList()).toEqual([])
    expect(store.fromGuide.getGuideList(state)).toEqual([
      { id: 1, type: 'Question' },
      { id: 2, type: 'Activity' }
    ])
  })

  it('should getSelectedPhoto', function () {
    expect(store.fromPhoto.getSelectedPhoto()).toNotExist()
    expect(store.fromPhoto.getSelectedPhoto(state)).toEqual({ id: 1 })
  })

  it('should getPhotoList', function () {
    expect(store.fromPhoto.getPhotoList()).toEqual([])
    expect(store.fromPhoto.getPhotoList(state)).toEqual([{ id: 2 }, { id: 1 }])
  })

  it('should getTagList', function () {
    expect(store.fromTag.getTagList()).toEqual([])
    expect(store.fromTag.getTagList(state)).toEqual([{ id: 2 }, { id: 1 }])
  })

  it('should getActiveUser', function () {
    expect(store.fromUser.getActiveUser()).toNotExist()
    expect(store.fromUser.getActiveUser(state)).toEqual({ id: 1 })
  })

  it('should getCurrentUser', function () {
    expect(store.fromUser.getCurrentUser()).toNotExist()
    expect(store.fromUser.getCurrentUser(state)).toEqual({ id: 2 })
  })
})
