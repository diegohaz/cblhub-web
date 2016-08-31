import React, { PropTypes } from 'react'

import Dialog from '../Dialog'
import FormControl from '../FormControl'
import Button from '../Button'

const RegisterForm = ({
  ...props,
  fields: { name, email, email2, password, password2 },
  submitting,
  handleSubmit,
  resetForm,
  error
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Dialog type="error">{error}</Dialog>}
      <FormControl label="Name" field={name} />
      <FormControl type="email" label="E-mail" field={email} />
      <FormControl type="email" label="Repeat e-mail" field={email2} />
      <FormControl type="password" label="Password" field={password} />
      <FormControl type="password" label="Repeat password" field={password2} />
      <div>
        <Button type="submit" disabled={submitting} style={{ marginRight: '1rem' }}>Register</Button>
        <Button type="button" kind="secondary" onClick={resetForm}>Reset</Button>
      </div>
    </form>
  )
}

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  back: PropTypes.string
}

export default RegisterForm
