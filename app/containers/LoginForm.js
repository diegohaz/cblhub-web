import React from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { fetchMe, createSession } from '../store'
import { createValidator, required, email, minLength } from '../services/validation'
import LoginForm from '../components/LoginForm'

import Link from '../components/Link'

const onSubmit = ({ email, password }, dispatch, { back }) =>
  dispatch(
    createSession(email, password)
  ).then(() =>
    dispatch(fetchMe())
  ).then(() =>
    dispatch(push(back || '/'))
  ).catch(({ response }) => {
    let error = {}
    if (response.status === 401) {
      const link = <Link to={`/reset-password?back=${back}`}>Forgot your password?</Link>
      error = { _error: <span>Wrong email or password. {link}</span> }
    } else {
      error = { _error: 'A unknown error occurred. Please try again later.' }
    }
    throw error
  })

const validate = createValidator({
  email: [required, email],
  password: [required, minLength(6)]
})

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(LoginForm)
