import React, { PropTypes } from 'react'
import { colors } from '../../config/style'

import Page from '../Page'
import LoginForm from '../../containers/LoginForm'
import Button from '../Button'

const LoginPage = ({ location }) => {
  return (
    <Page title='Login' style={{ width: 480 }}>
      <LoginForm back={location.query.back} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <div style={{ backgroundColor: colors.grayscale.light, width: '100%', height: 1 }} />
          <div style={{ padding: '1rem', backgroundColor: colors.grayscale.white }}>or</div>
          <div style={{ backgroundColor: colors.grayscale.light, width: '100%', height: 1 }} />
        </div>
        <Button
          style={{ width: '100%' }}
          kind='accent'
          to={`/register?back=${location.query.back}`}>
          Register a new account
        </Button>
      </div>
    </Page>
  )
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoginPage
