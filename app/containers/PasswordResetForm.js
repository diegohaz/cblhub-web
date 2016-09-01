import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { updatePasswordReset, createSession, fetchMe } from '../store'
import { createValidator, required, minLength, match } from '../services/validation'

import PasswordResetForm from '../components/PasswordResetForm'

const onSubmit = ({ password }, dispatch, { token }) =>
  dispatch(updatePasswordReset(token, { password }))
    .then((user) => dispatch(createSession(user.email, password)))
    .then(() => dispatch(fetchMe()))
    .then(() => dispatch(push('/')))
    .catch(({ response }) => {
      const error = { _error: 'A unknown error occurred. Please try again later.' }
      throw error
    })

const validate = createValidator({
  password: [required, minLength(6)],
  password2: [required, match('password')]
})

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'passwordReset',
  fields: ['password', 'password2'],
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(PasswordResetForm)
