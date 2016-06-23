import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  fromUser,
  fromSession,
  fromStatus,
  fetchMe,
  FETCH_CHALLENGE,
  FETCH_CHALLENGES,
  FETCH_GUIDE
} from '../store'

import App from '../components/App'

class AppContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    fetchMe: PropTypes.func.isRequired
  }

  static fetchData ({ store }) {
    if (fromSession.getToken(store.getState())) {
      return store.dispatch(fetchMe()).catch(() => true)
    } else {
      return Promise.resolve()
    }
  }

  componentDidMount () {
    const { user, token, fetchMe } = this.props

    if (!user && token) {
      fetchMe()
    }
  }

  render () {
    return <App {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  token: fromSession.getToken(state),
  user: fromUser.getCurrentUser(state),
  loading: fromStatus.getIsLoading(state, [
    FETCH_CHALLENGE,
    FETCH_CHALLENGES,
    FETCH_GUIDE
  ]),
  error: fromStatus.getIsFailed(state)
})

const mapDispatchToProps = {
  fetchMe
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
