import React, { PropTypes } from 'react'

import Page from '../Page'
import LoginForm from '../../containers/LoginForm'

const LoginPage = ({ location }) => {
  return (
    <Page title='Login' style={{ width: 480 }}>
      <LoginForm back={location.query.back} />
    </Page>
  )
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoginPage
