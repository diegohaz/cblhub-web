import React from 'react'
import expect, { createSpy } from 'expect'
import { shallow } from 'enzyme'
import UserButton from './'

describe('UserButton Component', function () {
  let onUserLogout, render, location

  beforeEach(function () {
    onUserLogout = createSpy()
    location = { pathname: '/test' }
    render = (props = {}) =>
      shallow(<UserButton location={location} onUserLogout={onUserLogout} {...props} />)
  })

  it('should display login button if user was not passed', function () {
    const button = render()
    expect(button.find('UserDropdown').length).toEqual(0)
    expect(button.find('Button').length).toEqual(1)
  })

  it('login button should have proper path', function () {
    const button = render()
    expect(button.find('[to="/login?back=/test"]').length).toEqual(1)
  })

  describe('When user is passed', function () {
    let renderWithUser, user

    beforeEach(function () {
      user = { picture: 'picture.jpg', name: 'Foo bar' }
      renderWithUser = (props = {}) => render({ user })
    })

    it('should display picture and name of the user', function () {
      const button = renderWithUser()
      expect(button.findWhere((n) => n.prop('src') === user.picture).length).toBeMoreThan(0)
      expect(button.findWhere((n) => n.text() === user.name).length).toBeMoreThan(0)
    })

    it('should display a log out option', function () {
      const button = renderWithUser()
      expect(button.findWhere((n) => n.text() === 'Log out').length).toBeMoreThan(0)
    })

    it('should call onUserLogout when click on log out option', function () {
      const button = renderWithUser()
      expect(onUserLogout).toNotHaveBeenCalled()
      button.simulate('selection', onUserLogout)
      expect(onUserLogout).toHaveBeenCalled()
    })
  })
})
