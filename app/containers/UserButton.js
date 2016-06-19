import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { removeSession } from '../store/session/session.actions'
import { fromEntities, fromUser } from '../store'

import UserButton from '../components/UserButton'

const mapStateToProps = (state) => ({
  user: fromEntities.getUser(state, fromUser.getMyId(state))
})

const mapDispatchToProps = {
  onUserLogout: removeSession
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserButton))
