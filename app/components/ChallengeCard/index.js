import React, { PropTypes } from 'react'
import * as router from 'react-router'
import Radium, { Style } from 'radium'
import moment from 'moment'
import { colors } from '../../config/style'

import Icon, { contributions } from '../Icon'
import TagLink from '../TagLink'
import Image from '../Image'

const Link = Radium(router.Link)

const ChallengeCard = ({ challenge, style }) => {
  return (
    <div style={[styles.card, style]}>
      <Style
        scopeSelector={`.link${challenge.id}:hover + div img`}
        rules={{ transform: 'scale(1.2)' }} />
      <Link
        to={`/challenges/${challenge.id}`}
        style={styles.link}
        className={`link${challenge.id}`} />
      <div style={[styles.cover, challenge.photo && { backgroundColor: challenge.photo.color }]}>
        {challenge.photo &&
          <Image src={challenge.photo.medium.src} style={styles.image} width="100%" />
        }
        <Link to={`/?q=${challenge.bigIdea}`} style={styles.bigIdea}>{challenge.bigIdea}</Link>
        <Link to={`/challenges/${challenge.id}`} style={styles.title}>{challenge.title}</Link>
        <div style={styles.shadowTop} />
        <div style={styles.shadowBottom} />
      </div>
      <div style={styles.meta}>
        <div style={styles.info}>
          <div style={styles.date}>
            {moment(challenge.updatedAt).diff(challenge.createdAt, 'm') < 10 ? 'created ' : 'updated '}
            {moment(challenge.updatedAt).fromNow()}
          </div>
          <div style={styles.contributions}>
            <Icon icon={contributions} size={14} style={styles.contribIcon} />
            <span>{challenge.guides.length} contrib.</span>
          </div>
        </div>
        <div style={styles.essentialQuestion}>{challenge.essentialQuestion}</div>
        <div style={styles.tags}>
          {challenge.tags.slice(0, 3).map((tag) =>
            <TagLink key={tag.id} tag={tag} style={styles.tag} />
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  link: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2
  },
  cover: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '15rem',
    overflow: 'hidden',
    backgroundColor: colors.primary.light
  },
  shadowTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: `radial-gradient(
      closest-corner at 8% 8%,
      black -600%,
      transparent 600%
    )`
  },
  shadowBottom: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: `linear-gradient(
      to bottom,
      transparent 30%,
      black 130%
    )`
  },
  image: {
    minHeight: '100%',
    minWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'opacity 500ms ease, transform 500ms ease-in-out'
  },
  bigIdea: {
    position: 'absolute',
    color: colors.grayscale.white,
    zIndex: 2,
    top: 0,
    margin: '0.5rem',
    padding: '0.5rem',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  title: {
    position: 'absolute',
    bottom: 0,
    color: colors.grayscale.white,
    fontSize: '1.5rem',
    letterSpacing: '-0.05rem',
    lineHeight: 1,
    zIndex: 1,
    textDecoration: 'none',
    margin: '0.5rem',
    padding: '0.5rem'
  },
  meta: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '0.5rem'
  },
  info: {
    display: 'flex',
    fontSize: '0.9rem',
    color: colors.grayscale.dark
  },
  date: {
    flex: 1
  },
  contributions: {
    display: 'flex'
  },
  contribIcon: {
    marginRight: '0.2rem'
  },
  essentialQuestion: {
    flex: 1,
    margin: '1rem 0'
  },
  tags: {
    display: 'flex'
  },
  tag: {
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginRight: '0.2rem',
    zIndex: 2
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
  style: PropTypes.object
}

export default Radium(ChallengeCard)
