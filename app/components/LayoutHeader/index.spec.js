import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import LayoutHeader from './'

describe('LayoutHeader Component', function () {
  const render = () => shallow(<LayoutHeader />)

  it('should have link to home', function () {
    expect(render().find('[to="/"]').length).toBeMoreThan(0)
  })

  it('should have link to create challenge', function () {
    expect(render().find('[to="/challenges/create"]').length).toBeMoreThan(0)
  })
})
