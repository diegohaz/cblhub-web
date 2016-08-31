import React, { PropTypes } from 'react'

import Page from '../Page'
import RegisterForm from '../../containers/RegisterForm'
import FacebookLoginButton from '../../containers/FacebookLoginButton'
import Separator from '../Separator'
import Link from '../Link'

const RegisterPage = ({ location }) => {
  return (
    <Page title="Sign Up" style={{ width: 480 }}>
      <FacebookLoginButton style={{ width: '100%' }} />
      <Separator title="Or use your email account" />
      <RegisterForm back={location.query.back} />
      <Separator />
      <div style={{ fontSize: '0.85rem' }}>
        By creating an account, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
      </div>
    </Page>
  )
}

RegisterPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default RegisterPage
