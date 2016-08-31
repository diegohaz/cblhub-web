import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { FormControl } from './'

describe('FormControl Component', function () {
  let field, render

  beforeEach(function () {
    field = { name: 'test' }
    render = (props = {}) =>
      shallow(<FormControl field={field} {...props} />)
  })

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
    expect(input.find('Input').length).toBeMoreThan(0)
  })

  it('should display error', function () {
    const input = render({ field: { ...field, touched: true, error: 'test error' } })
    expect(input.findWhere((n) => n.text() === 'test error').length).toBeMoreThan(0)
  })
})
