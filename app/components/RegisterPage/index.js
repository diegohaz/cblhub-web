import React, { PropTypes } from 'react'

import Page from '../Page'
import RegisterForm from '../../containers/RegisterForm'

const RegisterPage = ({ location }) => {
  return (
    <Page title='Sign Up' style={{ width: 480 }}>
      <RegisterForm back={location.query.back} />
    </Page>
  )
}

RegisterPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default RegisterPage
