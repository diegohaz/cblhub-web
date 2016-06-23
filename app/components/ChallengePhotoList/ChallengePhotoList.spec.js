import React from 'react'
import expect, { createSpy } from 'expect'
import { shallow } from 'enzyme'
import ChallengePhotoList from './'

describe('ChallengePhotoList Component', function () {
  let onPhotoSave, onPhotoCancel, onPhotoSelect, render

  const photos = [{
    small: { src: 'test1.jpg' },
    title: 'Test1'
  }, {
    small: { src: 'test2.jpg' },
    title: 'Test2'
  }]

  const findPhotoButtons = (list) => list.findWhere((n) =>
    n.type() === 'button' && n.find('img').length > 0
  )

  beforeEach(function () {
    onPhotoSave = createSpy()
    onPhotoCancel = createSpy()
    onPhotoSelect = createSpy()
    const spies = { onPhotoSave, onPhotoCancel, onPhotoSelect }
    render = (props = {}) => shallow(<ChallengePhotoList {...spies} {...props} />)
    expect.restoreSpies()
  })

  it('should apply class name', function () {
    const list = render({ className: 'test-class-name', loadingPhotos: true })
    expect(list.prop('className')).toEqual('test-class-name')
  })

  it('should display nothing when it has no photos and is not loading', function () {
    const list = render()
    expect(list.children().length).toEqual(0)
  })

  it('should display loader when loadingPhotos is true', function () {
    const list = render({ loadingPhotos: true })
    expect(list.find('ProgressLoader').length).toEqual(1)
  })

  it('should display proper images when photos is passed', function () {
    const list = render({ photos })
    expect(list.findWhere((n) =>
      n.prop('src') === 'test1.jpg' && n.prop('alt') === 'Test1'
    ).length).toBeMoreThan(0)
    expect(list.findWhere((n) =>
      n.prop('src') === 'test2.jpg' && n.prop('alt') === 'Test2'
    ).length).toBeMoreThan(0)
  })

  it('should display images inside buttons', function () {
    const list = render({ photos })
    expect(findPhotoButtons(list).length).toEqual(2)

    const anotherList = render({ photos: [ ...photos, { small: { src: 'a' } } ] })
    expect(findPhotoButtons(anotherList).length).toEqual(3)
  })

  it('should call onPhotoSelect when clicking the buttons', function () {
    const buttons = findPhotoButtons(render({ photos }))

    expect(onPhotoSelect).toNotHaveBeenCalled()
    buttons.at(0).simulate('click')
    expect(onPhotoSelect).toHaveBeenCalled()

    onPhotoSelect.reset()
    expect(onPhotoSelect).toNotHaveBeenCalled()
    buttons.at(1).simulate('click')
    expect(onPhotoSelect).toHaveBeenCalled()
  })

  it('should display Flickr info', function () {
    const list = render({ photos })
    const text = list.findWhere((n) => /Flickr/.test(n.text()))
    expect(text.length).toBeMoreThan(0)
  })

  it('should have a cancel button', function () {
    const list = render({ photos })
    expect(list.findWhere((n) => n.text() === 'Cancel').length).toBeMoreThan(0)
  })

  it('should have a save button', function () {
    const list = render({ photos })
    expect(list.findWhere((n) => n.text() === 'Save').length).toBeMoreThan(0)
  })

  it('should call onPhotoCancel when clicking cancel button', function () {
    const button = render({ photos }).findWhere((n) => n.text() === 'Cancel').first()

    expect(onPhotoCancel).toNotHaveBeenCalled()
    button.simulate('click')
    expect(onPhotoCancel).toHaveBeenCalled()
  })

  it('should call onPhotoSave when clicking cancel button', function () {
    const button = render({ photos }).findWhere((n) => n.text() === 'Save').first()

    expect(onPhotoSave).toNotHaveBeenCalled()
    button.simulate('click')
    expect(onPhotoSave).toHaveBeenCalled()
  })
})
