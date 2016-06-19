import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentChallenge, fromEntities, fromPhoto } from '../store'
import { fetchChallenge } from '../store/challenge/challenge.actions'
import { searchPhotos, selectPhoto } from '../store/photo/photo.actions'

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
  challenge: getCurrentChallenge(state),
  photos: fromPhoto.getCurrentIds(state).map((id) => fromEntities.getPhoto(state, id)),
  selectedPhoto: fromPhoto.getSelectedId(state)
})

const mapDispatchToProps = {
  fetchChallenge,
  onPhotoSearch: searchPhotos,
  onPhotoSelect: selectPhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePageContainer)
