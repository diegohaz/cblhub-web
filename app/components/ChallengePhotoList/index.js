import React, { PropTypes } from 'react'

const ChallengePhotoList = ({
  challenge,
  photos = [],
  onPhotoSearch,
  onPhotoSelect
}) => {
  const handleSearch = () => onPhotoSearch({ q: challenge.bigIdea })
  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      {photos.map((photo) =>
        <img src={photo.small.src} width={photo.small.width} height={photo.small.height} />
      )}
    </div>
  )
}

ChallengePhotoList.propTypes = {
  challenge: PropTypes.object.isRequired,
  photos: PropTypes.array,
  selectedPhoto: PropTypes.object,
  onPhotoSearch: PropTypes.func.isRequired,
  onPhotoSelect: PropTypes.func.isRequired
}

export default ChallengePhotoList
