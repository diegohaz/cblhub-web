import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fromUser, removeSession } from '../store'

import UserButton from '../components/UserButton'

const mapStateToProps = (state) => ({
  user: fromUser.getCurrentUser(state)
})

const mapDispatchToProps = {
  onUserLogout: removeSession
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserButton))
