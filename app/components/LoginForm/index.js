import React, { PropTypes } from 'react'
import Radium from 'radium'
import { writeMediaQuery, breakpoints } from '../../config/style'

import Dialog from '../Dialog'
import FormControl from '../FormControl'
import Button from '../Button'
import Link from '../Link'

const LoginForm = ({
  ...props,
  fields: { email, password },
  submitting,
  handleSubmit,
  error,
  back
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Dialog type="error">{error}</Dialog>}
      <FormControl type="email" label="E-mail" field={email} />
      <FormControl type="password" label="Password" field={password} />
      <div style={styles.options}>
        <Button style={styles.button} type="submit" disabled={submitting}>Log In</Button>
        <div style={styles.links}>
          <div>
            {"Forgot your password? "}
            <Link to={`/reset-password?back=${back}`}>Reset password</Link>
          </div>
          <div>
            {"Don't you have an account? "}
            <Link to={`/register?back=${back}`} kind="accent">Sign up</Link>
          </div>
        </div>
      </div>
    </form>
  )
}

const styles = {
  options: {
    display: 'flex',
    alignItems: 'center',
    [writeMediaQuery(breakpoints.small)]: {
      flexDirection: 'column'
    }
  },
  button: {
    [writeMediaQuery(breakpoints.small)]: {
      width: '100%'
    }
  },
  links: {
    marginLeft: 'auto',
    lineHeight: 1.5,
    [writeMediaQuery(breakpoints.small)]: {
      fontSize: '0.9rem',
      marginTop: '1rem',
      marginLeft: 0
    }
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  back: PropTypes.string
}

export default Radium(LoginForm)
