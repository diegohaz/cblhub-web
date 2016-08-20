import React from 'react'
import expect, { createSpy } from 'expect'
import { shallow } from 'enzyme'
import RegisterForm from './'

describe('RegisterForm Component', function () {
  let form, submitting, touched, formError, fieldError, handleSubmit, resetForm

  beforeEach(function () {
    submitting = false
    touched = false
    formError = null
    fieldError = null
    resetForm = createSpy()
    handleSubmit = createSpy()
  })

  const render = () => {
    const props = {
      submitting,
      handleSubmit,
      resetForm,
      error: formError,
      fields: {
        name: { value: '', error: fieldError, touched },
        email: { value: '', error: fieldError, touched },
        email2: { value: '', error: fieldError, touched },
        password: { value: '', error: fieldError, touched },
        password2: { value: '', error: fieldError, touched }
      }
    }
    return shallow(<RegisterForm {...props} />)
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
