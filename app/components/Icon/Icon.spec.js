import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Icon from './'

const render = (props) => shallow(<Icon icon='test' { ...props } />)

describe('Icon Component', function () {
  it('should apply class name', function () {
    const icon = render({ className: 'test-class-name' })
    expect(icon.prop('className')).toEqual('test-class-name')
  })

  it('should set size properly', function () {
    const icon = render({ size: 40 })
    expect(icon.prop('style')).toEqual({ width: '40px', height: '40px' })
  })
})
