import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Logo from './'

const render = (props) => shallow(<Logo { ...props } />)

describe('Logo Component', function () {
  it('should apply class name', function () {
    const logo = render({ className: 'test-class-name' })
    expect(logo.prop('className')).toEqual('test-class-name')
  })
})
