import { connect } from 'react-redux'
import { fromPhoto, fromStatus, selectPhoto, resetPhotos, SEARCH_PHOTOS } from '../store'

import ChallengePhotoList from '../components/ChallengePhotoList'

const mapStateToProps = (state) => ({
  photos: fromPhoto.getPhotoList(state),
  selected: fromPhoto.getSelectedPhoto(state),
  loading: fromStatus.getIsLoading(state, SEARCH_PHOTOS),
  error: fromStatus.getIsFailed(state, SEARCH_PHOTOS)
})

const mapDispatchToProps = {
  onCancel: resetPhotos,
  onSelect: selectPhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePhotoList)
