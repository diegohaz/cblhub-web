import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './LoginForm.scss'

const LoginForm = ({
  fields: { email, password },
  submitting,
  handleSubmit,
  error,
  className = {}
}) => {
  return (
    <form onSubmit={handleSubmit} className={cls(styles.form, className, {[styles.error]: error})}>
      <div className={styles.formError}>{error}</div>
      <div className={styles.formControl}>
        <label>E-mail</label>
        <input type='email' { ...email } />
        {email.touched && email.error &&
          <div className={styles.fieldError}>{email.error}</div>
        }
      </div>
      <div className={styles.formControl}>
        <label>Password</label>
        <input type='password' { ...password } />
        {password.touched && password.error &&
          <div className={styles.fieldError}>{password.error}</div>
        }
      </div>
      <div className={styles.formControl}>
        <button type='submit' disabled={submitting}>Sign In</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  className: PropTypes.string,
  back: PropTypes.string
}

export default LoginForm
