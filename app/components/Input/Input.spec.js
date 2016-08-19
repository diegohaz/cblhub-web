import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Input from './'

describe('Input Component', function () {
  const render = (props = {}) => shallow(<Input {...props} />)

  it('should render a input', function () {
    expect(render().type()).toEqual('input')
  })

  it('should pass any property to input', function () {
    const input = render({ test: 'value' })
    expect(input.prop('test')).toEqual('value')
  })
})
