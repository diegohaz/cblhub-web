import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Icon from './'

const render = (props) => shallow(<Icon icon='test' {...props} />)

describe('Icon Component', function () {
  it('should set size properly', function () {
    const icon = render({ size: 40 })
    expect(icon.prop('style')).toInclude({ width: '40px', height: '40px' })
  })
})
