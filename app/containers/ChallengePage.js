import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  fromChallenge,
  fromPhoto,
  fromUser,
  updateChallenge,
  removeChallenge,
  fetchChallenge,
  searchPhotos
} from '../store'

import ChallengePage from '../components/ChallengePage'

class ChallengePageContainer extends Component {
  static propTypes = {
    challenge: PropTypes.object,
    fetchChallenge: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData ({ store, params }) {
    return store.dispatch(fetchChallenge(params.id))
  }

  componentDidMount () {
    const { params, fetchChallenge } = this.props
    return fetchChallenge(params.id)
  }

  render () {
    return <ChallengePage {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  user: fromUser.getCurrentUser(state),
  challenge: fromChallenge.getActiveChallenge(state),
  selectedPhoto: fromPhoto.getSelectedPhoto(state)
})

const mapDispatchToProps = {
  fetchChallenge,
  onChallengeRemove: removeChallenge,
  onPhotoSearch: searchPhotos,
  onChallengeUpdate: updateChallenge
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePageContainer)
