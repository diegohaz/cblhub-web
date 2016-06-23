import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './ChallengePhotoList.scss'

import ProgressLoader from '../ProgressLoader'

const handleSelect = ({ onPhotoSelect }, photo) =>
  onPhotoSelect.bind(null, photo && photo.id)

const handleSave = ({ onPhotoSave, selectedPhoto }) =>
  onPhotoSave.bind(null, selectedPhoto && selectedPhoto.id)

const ChallengePhotoList = ({
  ...props,
  className,
  loadingPhotos,
  onPhotoCancel,
  photos = []
}) => {
  if (!photos.length && !loadingPhotos) return null
  return (
    <div className={cls(styles.list, className)}>
      {loadingPhotos && <ProgressLoader />}
      <ul>
        {photos.map((photo, i) =>
          <li key={i}>
            <button onClick={handleSelect(props, photo)}>
              <img src={photo.small.src} alt={photo.title} />
            </button>
          </li>
        )}
      </ul>
      <div className={styles.alert}>This product uses the Flickr API but is not endorsed or certified by Flickr.</div>
      <button onClick={onPhotoCancel}>Cancel</button>
      <button onClick={handleSave(props)}>Save</button>
    </div>
  )
}

ChallengePhotoList.propTypes = {
  photos: PropTypes.array,
  className: PropTypes.string,
  selectedPhoto: PropTypes.string,
  onPhotoSelect: PropTypes.func.isRequired,
  onPhotoSave: PropTypes.func.isRequired,
  onPhotoCancel: PropTypes.func.isRequired,
  loadingPhotos: PropTypes.bool
}

export default ChallengePhotoList
