import React, { PropTypes } from 'react'

import Page from '../Page'
import ResetPasswordForm from '../../containers/ResetPasswordForm'

const ResetPasswordPage = ({ location }) => {
  const { back, email } = location.query
  return (
    <Page title="Reset password" style={{ width: 480 }}>
      <ResetPasswordForm back={back} email={email} />
    </Page>
  )
}

ResetPasswordPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default ResetPasswordPage
