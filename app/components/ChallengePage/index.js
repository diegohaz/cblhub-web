import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { baseUrl } from '../../config'

import ChallengeCover from '../ChallengeCover'
import ChallengePhotoList from '../../containers/ChallengePhotoList'
import Button from '../Button'

const isAuthor = ({ user, challenge }) => user && user.id === challenge.user.id
const handleRemove = ({ onChallengeRemove, challenge }) => () => onChallengeRemove(challenge.id)

const handlePhotoSave = ({ onChallengeUpdate, challenge, selectedPhoto }) => () =>
  selectedPhoto && onChallengeUpdate({ id: challenge.id, photo: selectedPhoto.id })

const ChallengePage = ({ ...props, selectedPhoto, user, challenge }) => {
  if (!challenge) return null
  return (
    <div style={{ width: '100%' }}>
      <Helmet
        title={`${challenge.title} | CBLHub`}
        meta={[
          challenge.description &&
          { name: 'description', content: challenge.description.slice(0, 160) } || {},
          { property: 'og:url', content: `${baseUrl}/challenges/${challenge.id}` },
          { property: 'og:title', content: challenge.title },
          { property: 'og:site_name', content: 'CBLHub' },
          ... challenge.photo && [
            { property: 'og:image', content: challenge.photo.large.src },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:width', content: challenge.photo.large.width },
            { property: 'og:image:height', content: challenge.photo.large.height }
          ] || {}
        ]} />
      <ChallengePhotoList onSave={handlePhotoSave(props)} />
      <ChallengeCover {...props} />
      {isAuthor(props) &&
        <Button kind="error" onClick={handleRemove(props)}>Remove challenge</Button>
      }
    </div>
  )
}

ChallengePage.propTypes = {
  user: PropTypes.object,
  challenge: PropTypes.object,
  selectedPhoto: PropTypes.object,
  onChallengeUpdate: PropTypes.func.isRequired,
  onChallengeRemove: PropTypes.func.isRequired,
  onPhotoSearch: PropTypes.func.isRequired
}

export default ChallengePage
