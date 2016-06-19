import React from 'react'
import Helmet from 'react-helmet'
import styles from './ChallengeCreationPage.scss'

import ChallengeCreationForm from '../../containers/ChallengeCreationForm'

const ChallengeCreationPage = () => {
  return (
    <div className={styles.page}>
      <Helmet title='Create challenge | CBLHub' />
      <div className={styles.card}>
        <h2 className={styles.title}>Create challenge</h2>
        <ChallengeCreationForm className={styles.loginForm} />
      </div>
    </div>
  )
}

export default ChallengeCreationPage
