import React, { PropTypes } from 'react'

import Page from '../Page'
import PasswordResetRequestForm from '../../containers/PasswordResetRequestForm'
import PasswordResetForm from '../../containers/PasswordResetForm'
import Dialog from '../Dialog'

const ResetPasswordPage = ({ failed, params, location }) => {
  return (
    <Page title="Reset password" style={{ width: 480 }}>
      {failed &&
        <Dialog type="error">
          This token is not valid or has expired. Try to send a new request.
        </Dialog>
      }
      {params.token && !failed &&
        <PasswordResetForm token={params.token} /> ||
        <PasswordResetRequestForm back={location.query.back} />
      }
    </Page>
  )
}

ResetPasswordPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired,
  failed: PropTypes.bool
}

export default ResetPasswordPage
