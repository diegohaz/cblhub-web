import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import ChallengePhotoList from '../ChallengePhotoList'

const ChallengePage = ({ ...props, challenge }) => {
  if (!challenge) return null
  return (
    <div>
      <Helmet title={`${challenge.title} | CBLHub`} />
      <ChallengePhotoList { ...props } />
    </div>
  )
}

ChallengePage.propTypes = {
  challenge: PropTypes.object
}

export default ChallengePage
