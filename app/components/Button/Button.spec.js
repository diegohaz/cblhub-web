import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Button from './'

describe.only('Button Component', function () {
  it('should render a button if property "to" was not passed', function () {
    const button = shallow(<Button />)
    expect(button.type()).toEqual('button')
  })

  it('should set property "type" correctly to button', function () {
    const button = shallow(<Button type='submit' />)
    expect(button.find('[type="submit"]').length).toBeMoreThan(0)
  })

  it('should display children', function () {
    const button = shallow(<Button>test</Button>)
    expect(button.findWhere((n) => n.text() === 'test').length).toBeMoreThan(0)
  })

  it('should display children tags', function () {
    const button = shallow(<Button><span>test</span></Button>)
    expect(button.findWhere((n) =>
      n.type() === 'span' && n.text() === 'test'
    ).length).toBeMoreThan(0)
  })

  it('should render a link if property "to" was passed', function () {
    const button = shallow(<Button to='/test' />)
    expect(button.find('Link[to="/test"]').length).toBeMoreThan(0)
  })
})
