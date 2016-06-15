import expect from 'expect'
import * as selectors from './challenge.selector'

describe('Challenge Selector', function () {
  let state

  before(function () {
    state = {
      entities: {
        challenges: {
          1: { id: 1 },
          2: { id: 2 },
          3: { id: 3, guides: [1, 2, 3, 4] }
        },
        guides: {
          1: { id: 1, type: 'Question' },
          2: { id: 2, type: 'Activity' },
          3: { id: 3, type: 'Resource' },
          4: { id: 4, type: 'Resource' }
        }
      },
      challenge: {
        item: 1,
        items: [1, 2]
      }
    }
  })

  it('should getChallenge', function () {
    selectors.getChallenge.resetRecomputations()
    expect(selectors.getChallenge(state)).toEqual({ id: 1 })
    expect(selectors.getChallenge(state)).toEqual({ id: 1 })
    expect(selectors.getChallenge.recomputations()).toEqual(1)
  })

  it('should getChallenges', function () {
    selectors.getChallenges.resetRecomputations()
    expect(selectors.getChallenges(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getChallenges(state)).toEqual([{ id: 1 }, { id: 2 }])
    expect(selectors.getChallenges.recomputations()).toEqual(1)
  })

  describe('Guides', function () {
    before(function () {
      state = { ...state, challenge: { ...state.challenge, item: 3 } }
    })

    it('should getChallengeQuestions', function () {
      selectors.getChallengeQuestions.resetRecomputations()
      expect(selectors.getChallengeQuestions(state)).toEqual([{ id: 1, type: 'Question' }])
      expect(selectors.getChallengeQuestions(state)).toEqual([{ id: 1, type: 'Question' }])
      expect(selectors.getChallengeQuestions.recomputations()).toEqual(1)
    })

    it('should getChallengeActivities', function () {
      selectors.getChallengeActivities.resetRecomputations()
      expect(selectors.getChallengeActivities(state)).toEqual([{ id: 2, type: 'Activity' }])
      expect(selectors.getChallengeActivities(state)).toEqual([{ id: 2, type: 'Activity' }])
      expect(selectors.getChallengeActivities.recomputations()).toEqual(1)
    })

    it('should getChallengeResources', function () {
      selectors.getChallengeResources.resetRecomputations()
      expect(selectors.getChallengeResources(state)).toEqual([
        { id: 3, type: 'Resource' },
        { id: 4, type: 'Resource' }
      ])
      expect(selectors.getChallengeResources(state)).toEqual([
        { id: 3, type: 'Resource' },
        { id: 4, type: 'Resource' }
      ])
      expect(selectors.getChallengeResources.recomputations()).toEqual(1)
    })
  })
})
