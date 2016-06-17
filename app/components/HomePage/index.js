import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import styles from './HomePage.scss'
import challenges from './challenges.json'

import ChallengeList from '../ChallengeList'

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Helmet title='CBLHub' />
      <Link to='/login'>Login</Link>
      <ChallengeList challenges={challenges} />
    </div>
  )
}

export default HomePage
