import expect, { createSpy } from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Radium from 'radium'
import LoginForm from './'

Radium.TestMode.enable()

describe('LoginForm Component', function () {
  let form, submitting, touched, formError, fieldError, handleSubmit

  beforeEach(function () {
    submitting = false
    touched = false
    formError = null
    fieldError = null
    handleSubmit = createSpy()
  })

  const render = () => {
    const props = {
      submitting,
      handleSubmit,
      error: formError,
      fields: {
        email: { value: '', error: fieldError, touched },
        password: { value: '', error: fieldError, touched }
      }
    }
    return shallow(<LoginForm {...props} />)
  }

  it('should call handleSubmit when submit form', function () {
    form = render()
    form.simulate('submit')
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should not disable submit button', function () {
    form = render()
    expect(form.find('Button[disabled=true]').length).toEqual(0)
  })

  it('should disable submit button while submitting', function () {
    submitting = true
    form = render()
    expect(form.find('Button[disabled=true]').length).toEqual(1)
  })

  it('should display form error message', function () {
    formError = 'Boom'
    form = render()
    expect(form.find(':contains("Boom")').length).toEqual(0)
  })
})
