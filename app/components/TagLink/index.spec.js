import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import TagLink from './'

const render = (name) => shallow(<TagLink tag={{ name }} />)

describe('TagLink Component', function () {
  it('should have Link child', function () {
    const tag = render('tag')
    expect(tag.find('Link').length).toEqual(1)
  })

  it('should link to correct url', function () {
    const tag = render('tag')
    expect(tag.find('Link').prop('to')).toEqual('/?q=tag')
  })

  it('should display tag name', function () {
    const tag = render('tag')
    expect(tag.find('Link').children().text()).toEqual('tag')
  })
})
