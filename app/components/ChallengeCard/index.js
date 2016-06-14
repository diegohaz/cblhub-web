import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './ChallengeCard.scss'

const ChallengeCard = ({ challenge }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        <img src={challenge.photo.medium.src} alt={challenge.title} />
        <Link to={`/?q=${challenge.bigIdea}`} className={styles.bigIdea}>{challenge.bigIdea}</Link>
        <Link to={`/challenges/${challenge.id}`} className={styles.title}>{challenge.title}</Link>
      </div>
    </div>
  )
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeCard
