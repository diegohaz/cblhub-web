import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import styles from './LoginPage.scss'

import LoginForm from '../../containers/LoginForm'

const LoginPage = ({ location }) => {
  return (
    <div className={styles.page}>
      <Helmet title='Login | CBLHub' />
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <LoginForm className={styles.loginForm} back={location.query.back} />
      </div>
      <div className={styles.card}>
        Still don't have a user?
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoginPage
