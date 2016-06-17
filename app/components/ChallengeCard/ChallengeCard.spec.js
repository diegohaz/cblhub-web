import React from 'react'
import expect from 'expect'
import moment from 'moment'
import { shallow } from 'enzyme'
import ChallengeCard from './'

const render = (challenge) => shallow(<ChallengeCard challenge={challenge} />)

describe('ChallengeCard Component', function () {
  let challenge

  beforeEach(function () {
    challenge = {
      id: 1,
      title: 'Test title',
      bigIdea: 'Test big idea',
      essentialQuestion: 'Test?',
      createdAt: '2016-06-16T20:00:00Z',
      updatedAt: '2016-06-16T20:00:00Z',
      tags: [],
      guides: []
    }
  })

  it('should have a link to the challenge page', function () {
    const links = render(challenge).find('Link[to="/challenges/1"]')
    expect(links.length).toBeMoreThan(0)
  })

  it('should not have img if challenge has no photo', function () {
    const img = render(challenge).find('img')
    expect(img.length).toEqual(0)
  })

  it('should have img if challenge has photo', function () {
    challenge.photo = { medium: { src: 'test.jpg', width: 640, height: 480 } }
    const img = render(challenge).find('img')
    expect(img.length).toBeMoreThan(0)
  })

  it('should display challenge big idea with a link to search', function () {
    const bigIdea = render(challenge).findWhere((n) => {
      return n.children().first().text() === 'Test big idea'
    })
    expect(bigIdea.length).toBeMoreThan(0)
    expect(bigIdea.first().prop('to')).toEqual('/?q=Test big idea')
  })

  it('should display challenge title with link to challenge page', function () {
    const title = render(challenge).findWhere((n) => n.children().first().text() === 'Test title')
    expect(title.length).toBeMoreThan(0)
    expect(title.first().prop('to')).toEqual('/challenges/1')
  })

  it('should display challenge creation date if it was not updated after that', function () {
    const text = `created ${moment(challenge.createdAt).fromNow()}`
    const date = render(challenge).findWhere((n) => n.text() === text)
    expect(date.length).toBeMoreThan(0)
  })

  it('should display challenge update date if it was updated after being created', function () {
    challenge.updatedAt = '2016-06-16T21:00:00Z'
    const text = `updated ${moment(challenge.updatedAt).fromNow()}`
    const date = render(challenge).findWhere((n) => n.text() === text)
    expect(date.length).toBeMoreThan(0)
  })

  it('should display the number of challenge contributions', function () {
    const find = (text) => render(challenge).findWhere((n) => n.text().match(new RegExp(text, 'ig')))
    expect(find('0').length).toBeMoreThan(0)
    challenge.guides.push({})
    expect(find('1').length).toBeMoreThan(0)
    challenge.guides.push({}, {}, {})
    expect(find('4').length).toBeMoreThan(0)
  })

  it('should display the essential question', function () {
    const essentialQuestion = render(challenge).findWhere((n) => n.text() === 'Test?')
    expect(essentialQuestion.length).toBeMoreThan(0)
  })

  it('should display the first three tags of the challenge', function () {
    challenge.tags.push(
      { id: 1, name: 'tag1' },
      { id: 2, name: 'tag2' },
      { id: 3, name: 'tag3' },
      { id: 4, name: 'tag4' }
    )
    const tags = render(challenge).find('TagLink')
    expect(tags.length).toEqual(3)
    expect(tags.at(0).prop('tag').id).toEqual(1)
    expect(tags.at(1).prop('tag').id).toEqual(2)
    expect(tags.at(2).prop('tag').id).toEqual(3)
  })
})
