import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Input from './'

describe('Input Component', function () {
  const render = (props = {}) => shallow(<Input {...props} />)

  it('should display input without label', function () {
    const input = render()
    expect(input.find('label').length).toEqual(0)
  })

  it('should display label', function () {
    const input = render({ label: 'test' })
    expect(input.findWhere((n) => n.text() === 'test').length).toBeMoreThan(0)
  })

  it('should display input', function () {
    const input = render()
    expect(input.find('input').length).toBeMoreThan(0)
  })

  it('should pass any prop to input', function () {
    const input = render({ custom: 'test' })
    expect(input.find('input').first().prop('custom')).toEqual('test')
  })

  it('should display error', function () {
    const input = render({ field: { touched: true, error: 'test error' } })
    expect(input.findWhere((n) => n.text() === 'test error').length).toBeMoreThan(0)
  })
})
