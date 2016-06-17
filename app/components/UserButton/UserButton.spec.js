import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import UserButton from './'

const render = (props) => shallow(<UserButton icon='test' { ...props } />)

describe('UserButton Component', function () {
  it('should apply class name', function () {
    const button = render({ className: 'test-class-name' })
    expect(button.prop('className')).toEqual('test-class-name')
  })
})
