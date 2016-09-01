import React, { PropTypes } from 'react'

import Dialog from '../Dialog'
import FormControl from '../FormControl'
import Button from '../Button'

const PasswordResetForm = ({
  fields: { password, password2 },
  error,
  handleSubmit,
  submitting
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Dialog type="error">{error}</Dialog>}
      <FormControl type="password" label="New password" field={password} />
      <FormControl type="password" label="Repeat password" field={password2} />
      <Button type="submit" disabled={submitting}>Save</Button>
    </form>
  )
}

PasswordResetForm.propTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
}

export default PasswordResetForm
