import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { fetchMe, createSession } from '../store'
import { createValidator, required, email, minLength } from '../services/validation'
import LoginForm from '../components/LoginForm'

const onSubmit = ({ email, password }, dispatch, { back }) =>
  dispatch(
    createSession(email, password)
  ).then(() =>
    dispatch(fetchMe())
  ).then(() =>
    dispatch(push(back || '/'))
  ).catch(({ status }) => {
    let error = {}
    if (status === 401) {
      error = { _error: 'Wrong email or password' }
    } else {
      error = { _error: 'A unknown error occurred. Please try again later.' }
    }
    throw error
  })

class LoginFormContainer extends Component {
  render () {
    return <LoginForm onSubmit={onSubmit} {...this.props} />
  }
}

const validate = createValidator({
  email: [required, email],
  password: [required, minLength(6)]
})

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, mapDispatchToProps)(LoginFormContainer)
