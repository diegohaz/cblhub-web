import React from 'react'
import { reduxForm } from 'redux-form'
import { createPasswordReset } from '../store'
import { createValidator, required, email } from '../services/validation'
import PasswordResetRequestForm from '../components/PasswordResetRequestForm'

import Link from '../components/Link'

const onSubmit = ({ email }, dispatch, { back }) =>
  dispatch(createPasswordReset(email)).then(() => {}).catch(({ response }) => {
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
  form: 'passwordResetRequest',
  fields: ['email'],
  destroyOnUnmount: false,
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(PasswordResetRequestForm)
