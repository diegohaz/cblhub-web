import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { fetchMe, createUser, createSession } from '../store'
import { createValidator, required, email, minLength, match } from '../services/validation'
import RegisterForm from '../components/RegisterForm'

const onSubmit = ({ ...fields, email, password }, dispatch, { back }) =>
  dispatch(
    createUser(fields)
  ).then(() =>
    dispatch(createSession(email, password))
  ).then(() =>
    dispatch(fetchMe())
  ).then(() =>
    dispatch(push(back || '/'))
  ).catch(({ status }) => {
    let error = {}
    if (status === 400) {
      error = { _error: 'Email already registered.' }
    } else {
      error = { _error: 'A unknown error occurred. Please try again later.' }
    }
    throw error
  })

class RegisterFormContainer extends Component {
  render () {
    return <RegisterForm onSubmit={onSubmit} {...this.props} />
  }
}

const validate = createValidator({
  name: [required, minLength(3)],
  email: [required, email],
  email2: [required, match('email')],
  password: [required, minLength(6)],
  password2: [required, match('password')]
})

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'register',
  fields: ['name', 'email', 'email2', 'password', 'password2'],
  validate
}, mapStateToProps, mapDispatchToProps)(RegisterFormContainer)
