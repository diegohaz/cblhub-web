import React from 'react'
import { reduxForm } from 'redux-form'
import { resetPassword } from '../store'
import { createValidator, required, email } from '../services/validation'
import ResetPasswordForm from '../components/ResetPasswordForm'

import Link from '../components/Link'

const onSubmit = ({ email }, dispatch, { back }) =>
  dispatch(resetPassword(email)).then(() => {}).catch(({ response }) => {
    let error = {}
    if (response.status === 404) {
      const link = <Link to={`/register?back=${back}`}>Want to create an account?</Link>
      error = { _error: <span>{"This email isn't registered. "}{link}</span> }
    } else {
      error = { _error: 'A unknown error occurred. Please try again later.' }
    }
    throw error
  })

const validate = createValidator({
  email: [required, email]
})

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'resetPassword',
  fields: ['email'],
  destroyOnUnmount: false,
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(ResetPasswordForm)
