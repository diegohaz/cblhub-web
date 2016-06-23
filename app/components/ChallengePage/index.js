import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import ChallengePhotoList from '../ChallengePhotoList'

const handlePhotoSave = ({ onChallengeUpdate, challenge, selectedPhoto }) =>
  onChallengeUpdate.bind(null, { id: challenge.id, photo: selectedPhoto ? selectedPhoto.id : undefined })

const handlePhotoSearch = ({ onPhotoSearch, challenge }) =>
  onPhotoSearch.bind(null, { q: challenge.bigIdea })

const ChallengePage = ({ ...props, selectedPhoto, photos = [], loadingPhotos, challenge }) => {
  if (!challenge) return null
  return (
    <div style={{ width: '80%', marginTop: '20px' }}>
      <Helmet title={`${challenge.title} | CBLHub`} />
      <ChallengePhotoList {...props} onPhotoSave={handlePhotoSave(props)} />
      <img src={selectedPhoto ? selectedPhoto.small.src : challenge.photo.small.src} />
      <button
        disabled={loadingPhotos || photos.length}
        onClick={handlePhotoSearch(props)}>
        Change photo
      </button>
    </div>
  )
}

ChallengePage.propTypes = {
  challenge: PropTypes.object,
  photos: PropTypes.array,
  selectedPhoto: PropTypes.object,
  onChallengeUpdate: PropTypes.func.isRequired,
  onPhotoSearch: PropTypes.func.isRequired,
  loadingPhotos: PropTypes.bool
}

export default ChallengePage
