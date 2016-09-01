import React, { PropTypes } from 'react'
import Radium from 'radium'
import moment from 'moment'
import { colors, writeMediaQuery, breakpoints } from '../../config/style'

import Icon, { time, contributions, photo } from '../Icon'
import Image from '../Image'
import Button from '../Button'

const handlePhotoSearch = ({ onPhotoSearch, challenge }) => () =>
  onPhotoSearch({ q: challenge.bigIdea, limit: 50 })

const isAuthor = ({ user, challenge }) => user && user.id === challenge.user.id

const ChallengeCover = ({ ...props, user, challenge, selectedPhoto }) => {
  return (
    <div style={[styles.cover, challenge.photo && { backgroundColor: challenge.photo.color }]}>
      {(challenge.photo || selectedPhoto) &&
        <Image
          key={challenge.id}
          src={selectedPhoto ? selectedPhoto.large.src : challenge.photo.large.src}
          style={styles.photo}
          width="100%"
          height="100%" />
      }
      <div style={styles.shadow1} />
      <div style={styles.shadow2} />
      <div style={styles.options}>
        {isAuthor(props) &&
          <Button onClick={handlePhotoSearch(props)} style={styles.photoButton}>
            <Icon icon={photo} />
          </Button>
        }
      </div>
      <h2 style={styles.title}>{challenge.title}</h2>
      <div style={styles.info}>
        <div style={[styles.infoItem, styles.user]}>
          <img src={challenge.user.picture} style={styles.userPicture} />
          {challenge.user.name}
        </div>
        <div style={[styles.infoItem, styles.date]}>
          <Icon icon={time} style={styles.timeIcon} />
          {moment(challenge.updatedAt).diff(challenge.createdAt, 'm') < 10 ? 'created ' : 'updated '}
          {moment(challenge.updatedAt).fromNow()}
        </div>
        <div style={[styles.infoItem, styles.contributions]}>
          <Icon icon={contributions} style={styles.contribIcon} />
          {challenge.guides.length === 1 ? '1 contributon' : challenge.guides.length + ' contributions'}
        </div>
      </div>
    </div>
  )
}

const styles = {
  cover: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colors.grayscale.white,
    width: '100%',
    height: 'calc(100vh - 4.5rem)',
    minHeight: 420,
    overflow: 'hidden',
    backgroundColor: colors.primary.light,
    [writeMediaQuery(breakpoints.small)]: {
      height: 'calc(100vh - 4rem)'
    }
  },
  photo: {
    position: 'absolute',
    minHeight: '100%',
    minWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    left: 0,
    top: 0
  },
  options: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '1rem',
    boxSizing: 'border-box',
    [writeMediaQuery(breakpoints.small)]: {
      padding: '0.5rem'
    }
  },
  photoButton: {
    backgroundColor: 'transparent'
  },
  title: {
    margin: 'auto 1rem 1rem',
    fontSize: '2.5rem',
    letterSpacing: '-0.1rem',
    fontWeight: 400,
    textAlign: 'center',
    zIndex: 2
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    marginBottom: '5rem',
    color: 'rgba(255, 255, 255, 0.85)',
    [writeMediaQuery(breakpoints.small)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '3rem'
    }
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0
  },
  userPicture: {
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '0.5rem',
    width: 20,
    height: 20,
    flexShrink: 0
  },
  timeIcon: {
    marginRight: '0.5rem',
    flexShrink: 0
  },
  contribIcon: {
    marginRight: '0.5rem',
    flexShrink: 0
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem',
    height: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: '0 1.5rem',
    padding: '0 1rem',
    [writeMediaQuery(breakpoints.small)]: {
      borderWidth: 0,
      height: 'auto',
      margin: '1rem 0',
      padding: 0
    }
  },
  shadow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: 'radial-gradient(75% 150%, transparent, rgba(0,0,0,0.75))'
  },
  shadow2: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: 'radial-gradient(closest-corner at 50% 120%, black, transparent 300%)'
  }
}

ChallengeCover.propTypes = {
  user: PropTypes.object,
  challenge: PropTypes.object.isRequired,
  selectedPhoto: PropTypes.object,
  onPhotoSearch: PropTypes.func.isRequired,
  onChallengeUpdate: PropTypes.func.isRequired
}

export default Radium(ChallengeCover)
