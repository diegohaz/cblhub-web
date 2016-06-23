import React from 'react'
import expect, { createSpy } from 'expect'
import { shallow } from 'enzyme'
import UserButton from './'

describe('UserButton Component', function () {
  let render, onUserLogout, location

  beforeEach(function () {
    onUserLogout = createSpy()
    location = { pathname: '/test' }
    render = (props = {}) =>
      shallow(<UserButton onUserLogout={onUserLogout} location={location} {...props} />)
  })

  it('should apply class name', function () {
    const button = render({ className: 'test-class-name' })
    expect(button.prop('className')).toEqual('test-class-name')
  })

  it('should display a link to login when there is no user', function () {
    const link = render().find('Link[to="/login?back=/test"]')
    expect(link.length).toBeMoreThan(0)
  })

  describe('When user is logged in', function () {
    let renderWithUser

    beforeEach(function () {
      const user = { picture: 'picture.jpg', name: 'Foo bar' }
      renderWithUser = (props = {}) => render({ user, ...props })
    })

    it('should display picture and name of the user when there is one', function () {
      const button = renderWithUser()
      expect(button.findWhere((n) => n.prop('src') === 'picture.jpg').length).toBeMoreThan(0)
      expect(button.findWhere((n) => n.text() === 'Foo bar').length).toBeMoreThan(0)
    })

    it('should display a log out option', function () {
      const button = renderWithUser()
      expect(button.findWhere((n) => n.text() === 'Log out').length).toBeMoreThan(0)
    })

    it('should call onUserLogout when click on log out option', function () {
      const button = renderWithUser()
      const wrapper = button.children().first()
      expect(onUserLogout).toNotHaveBeenCalled()
      wrapper.simulate('selection', onUserLogout)
      expect(onUserLogout).toHaveBeenCalled()
    })
  })
})
