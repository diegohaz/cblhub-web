import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Textarea from './'

describe('Textarea Component', function () {
  const render = (props = {}) => shallow(<Textarea {...props} />)

  it('should render a textarea', function () {
    expect(render().type()).toEqual('textarea')
  })

  it('should pass any property to textarea', function () {
    const textarea = render({ test: 'value' })
    expect(textarea.prop('test')).toEqual('value')
  })
})
