import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fromStatus, fetchPasswordReset, FETCH_PASSWORD_RESET } from '../store'

import PasswordResetPage from '../components/PasswordResetPage'

class PasswordResetPageContainer extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    fetchPasswordReset: PropTypes.func.isRequired,
    failed: PropTypes.bool
  }

  static fetchData ({ store, params }) {
    if (params.token) {
      return store.dispatch(fetchPasswordReset(params.token)).then(() => {}, () => {})
    }
  }

  componentDidMount () {
    const { params, failed, fetchPasswordReset } = this.props
    if (params.token && !failed) {
      fetchPasswordReset(params.token)
    }
  }

  render () {
    return <PasswordResetPage {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  failed: fromStatus.getIsFailed(state, FETCH_PASSWORD_RESET)
})

const mapDispatchToProps = {
  fetchPasswordReset
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPageContainer)
