import React, { PropTypes } from 'react'
import cls from 'classnames'
import { Link } from 'react-router'
import moment from 'moment'
import styles from './ChallengeCard.scss'

import Icon, { contributions } from '../Icon'
import TagLink from '../TagLink'

const ChallengeCard = ({ challenge, className }) => {
  return (
    <div className={cls(styles.card, className)}>
      <Link to={`/challenges/${challenge.id}`} className={styles.link} />
      <div className={styles.cover}>
        {challenge.photo && <img src={challenge.photo.medium.src} />}
        <Link to={`/?q=${challenge.bigIdea}`} className={styles.bigIdea}>{challenge.bigIdea}</Link>
        <Link to={`/challenges/${challenge.id}`} className={styles.title}>{challenge.title}</Link>
      </div>
      <div className={styles.meta}>
        <div className={styles.info}>
          <div>
            {challenge.updatedAt === challenge.createdAt ? 'created ' : 'updated '}
            {moment(challenge.updatedAt).fromNow()}
          </div>
          <div>
            <Icon icon={contributions} size={14} />
            {challenge.guides.length} contrib.
          </div>
        </div>
        <div className={styles.essentialQuestion}>{challenge.essentialQuestion}</div>
        <div className={styles.tags}>
          {challenge.tags.slice(0, 3).map((tag) => <TagLink key={tag.id} tag={tag} />)}
        </div>
      </div>
    </div>
  )
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default ChallengeCard
