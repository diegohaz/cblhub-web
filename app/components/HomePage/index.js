import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import ChallengeList from '../ChallengeList'

const HomePage = ({ challenges, onLoadMore, displayLoadMore, location }) => {
  const title = location.query.q ? location.query.q + ' | CBLHub' : 'CBLHub'
  return (
    <div style={{ width: '100%' }}>
      <Helmet title={title} />
      <ChallengeList
        challenges={challenges}
        onLoadMore={onLoadMore}
        displayLoadMore={displayLoadMore} />
    </div>
  )
}

HomePage.propTypes = {
  challenges: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  displayLoadMore: PropTypes.bool
}

export default HomePage
