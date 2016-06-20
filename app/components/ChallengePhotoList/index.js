import React, { PropTypes } from 'react'

const ChallengePhotoList = ({
  challenge,
  photos = [],
  selectedPhoto,
  onPhotoSearch,
  onPhotoSelect,
  onChallengeUpdate
}) => {
  const handleSearch = () => onPhotoSearch({ q: challenge.bigIdea })
  const handleSubmit = () => onChallengeUpdate({ id: challenge.id, photo: selectedPhoto })
  const handleSelect = (photo) => onPhotoSelect.bind(null, photo.id)
  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {photos.map((photo, i) =>
          <li key={i}>
            <img src={photo.small.src} alt={photo.title} onClick={handleSelect(photo)} />
          </li>
        )}
      </ul>
      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}

ChallengePhotoList.propTypes = {
  challenge: PropTypes.object.isRequired,
  photos: PropTypes.array,
  selectedPhoto: PropTypes.string,
  onPhotoSearch: PropTypes.func.isRequired,
  onPhotoSelect: PropTypes.func.isRequired,
  onChallengeUpdate: PropTypes.func.isRequired
}

export default ChallengePhotoList
