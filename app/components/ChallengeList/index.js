import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './ChallengeList.scss'

import ChallengeCard from '../ChallengeCard'

const ChallengeList = ({ challenges, className }) => {
  return (
    <div className={cls(styles.list, className)}>
      {challenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
    </div>
  )
}

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
  className: PropTypes.string
}

export default ChallengeList
