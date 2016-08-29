import React, { PropTypes } from 'react'

import Page from '../Page'
import LoginForm from '../../containers/LoginForm'
import Dialog from '../Dialog'
import Separator from '../Separator'
import FacebookLoginButton from '../../containers/FacebookLoginButton'
import Link from '../Link'

const alert = 'You need to log in first. Don\'t worry, you will be redirected back at the end of this process.'

const LoginPage = ({ location }) => {
  const { warn } = location.query
  return (
    <Page title='Join the community' browserTitle='Log In' style={{ width: 480 }}>
      {typeof warn !== 'undefined' && <Dialog type='alert'>{alert}</Dialog>}
      <FacebookLoginButton style={{ width: '100%' }} />
      <Separator title='Or use your email account' />
      <LoginForm back={location.query.back} />
      <Separator />
      <div style={{ fontSize: '0.85rem' }}>
        By creating an account, you agree to our <Link to='/terms'>Terms of Service</Link> and <Link to='/privacy'>Privacy Policy</Link>.
      </div>
    </Page>
  )
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoginPage
