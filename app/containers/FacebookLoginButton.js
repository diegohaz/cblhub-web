import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { fetchMe, createFacebookSession } from '../store'

import FacebookLoginButton from '../components/FacebookLoginButton'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch, { location }) => ({
  onClick (accessToken) {
    dispatch(createFacebookSession(accessToken))
      .then(() => dispatch(fetchMe()))
      .then(() => dispatch(push(location.query.back || '/')))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FacebookLoginButton))
