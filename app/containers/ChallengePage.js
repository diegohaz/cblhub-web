import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  fromChallenge,
  fromPhoto,
  fromStatus,
  updateChallenge,
  fetchChallenge,
  searchPhotos,
  selectPhoto,
  resetPhotos,
  SEARCH_PHOTOS
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
  challenge: fromChallenge.getActiveChallenge(state),
  photos: fromPhoto.getPhotoList(state),
  selectedPhoto: fromPhoto.getSelectedPhoto(state),
  loadingPhotos: fromStatus.getIsLoading(state, SEARCH_PHOTOS)
})

const mapDispatchToProps = {
  fetchChallenge,
  onPhotoSearch: searchPhotos,
  onPhotoSelect: selectPhoto,
  onPhotoCancel: resetPhotos,
  onChallengeUpdate: updateChallenge
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePageContainer)
