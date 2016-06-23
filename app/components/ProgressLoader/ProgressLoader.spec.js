import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import ProgressLoader from './'

const render = (props) => shallow(<ProgressLoader {...props} />)

describe('ProgressLoader Component', function () {
  it('should apply class name', function () {
    const loader = render({ className: 'test-class-name' })
    expect(loader.prop('className')).toEqual('test-class-name')
  })
})
