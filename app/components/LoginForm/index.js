import React, { PropTypes } from 'react'

import Dialog from '../Dialog'
import FormControl from '../FormControl'
import Button from '../Button'

const LoginForm = ({
  ...props,
  fields: { email, password },
  submitting,
  handleSubmit,
  onSubmit,
  error
}) => {
  const submit = (values, dispatch) => onSubmit(values, dispatch, props)
  return (
    <form onSubmit={handleSubmit(submit)}>
      {error && <Dialog type='error'>{error}</Dialog>}
      <FormControl type='email' label='E-mail' field={email} />
      <FormControl type='password' label='Password' field={password} />
      <Button type='submit' disabled={submitting} style={{ width: '100%' }}>Sign In</Button>
    </form>
  )
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  back: PropTypes.string
}

export default LoginForm
