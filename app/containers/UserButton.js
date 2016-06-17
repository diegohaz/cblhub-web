import { connect } from 'react-redux'
import { fetchMe } from '../store/user/user.actions'
import { getMe } from '../store/user/user.selector'

import UserButton from '../components/UserButton'

const mapStateToProps = (state) => ({
  user: getMe(state)
})

const mapDispatchToProps = {
  fetchMe
}

export default connect(mapStateToProps, mapDispatchToProps)(UserButton)
