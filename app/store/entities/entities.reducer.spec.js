import expect from 'expect'
import reducer, * as fromEntities from './entities.reducer'

describe('Entities Reducer', function () {
  it('should return the initial state', function () {
    const initialState = {
      challenges: {},
      guides: {},
      photos: {},
      tags: {},
      users: {}
    }

    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should getChallenges', function () {
    expect(fromEntities.getChallenges()).toEqual({})
    expect(fromEntities.getChallenges({ challenges: { 1: 1 } })).toEqual({ 1: 1 })
  })

  it('should getChallenge', function () {
    expect(fromEntities.getChallenge()).toNotExist()
    expect(fromEntities.getChallenge({ challenges: {} }, 1)).toNotExist()
    expect(fromEntities.getChallenge({ challenges: { 1: 1 } }, 1)).toEqual(1)
  })

  it('should getGuides', function () {
    expect(fromEntities.getGuides()).toEqual({})
    expect(fromEntities.getGuides({ guides: { 1: 1 } })).toEqual({ 1: 1 })
  })

  it('should getGuide', function () {
    expect(fromEntities.getGuide()).toNotExist()
    expect(fromEntities.getGuide({ guides: {} }, 1)).toNotExist()
    expect(fromEntities.getGuide({ guides: { 1: 1 } }, 1)).toEqual(1)
  })

  it('should getPhotos', function () {
    expect(fromEntities.getPhotos()).toEqual({})
    expect(fromEntities.getPhotos({ photos: { 1: 1 } })).toEqual({ 1: 1 })
  })

  it('should getPhoto', function () {
    expect(fromEntities.getPhoto()).toNotExist()
    expect(fromEntities.getPhoto({ photos: {} }, 1)).toNotExist()
    expect(fromEntities.getPhoto({ photos: { 1: 1 } }, 1)).toEqual(1)
  })

  it('should getTags', function () {
    expect(fromEntities.getTags()).toEqual({})
    expect(fromEntities.getTags({ tags: { 1: 1 } })).toEqual({ 1: 1 })
  })

  it('should getTag', function () {
    expect(fromEntities.getTag()).toNotExist()
    expect(fromEntities.getTag({ tags: {} }, 1)).toNotExist()
    expect(fromEntities.getTag({ tags: { 1: 1 } }, 1)).toEqual(1)
  })

  it('should getUsers', function () {
    expect(fromEntities.getUsers()).toEqual({})
    expect(fromEntities.getUsers({ users: { 1: 1 } })).toEqual({ 1: 1 })
  })

  it('should getUser', function () {
    expect(fromEntities.getUser()).toNotExist()
    expect(fromEntities.getUser({ users: {} }, 1)).toNotExist()
    expect(fromEntities.getUser({ users: { 1: 1 } }, 1)).toEqual(1)
  })

  it('should handle actions', function () {
    const entities = { challenges: { 1: { id: 1 }, 2: { id: 2 } } }
    expect(
      reducer({}, { entities })
    ).toEqual({
      challenges: { 1: { id: 1 }, 2: { id: 2 } }
    })
  })
})
