import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import styles from './HomePage.scss'

import ChallengeList from '../ChallengeList'

const HomePage = ({ challenges, location }) => {
  const title = location.query.q ? location.query.q + ' | CBLHub' : 'CBLHub'

  return (
    <div className={styles.page}>
      <Helmet title={title} />
      <ChallengeList challenges={challenges} />
    </div>
  )
}

HomePage.propTypes = {
  challenges: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
}

export default HomePage
