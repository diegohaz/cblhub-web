import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors, writeMediaQuery, breakpoints } from '../../config/style'

import Image from '../Image'
import Button from '../Button'

const handleSelect = ({ onSelect }, photo) => () => onSelect(photo && photo.id)
const handleSave = ({ onSave, selected }) => () => onSave(selected && selected.id)

const ChallengePhotoList = ({
  ...props,
  photos = [],
  selected,
  loading,
  opened = photos.length || loading,
  error,
  onCancel,
  onSave,
  onSelect
}) => {
  if (!opened) return null
  return (
    <div style={styles.box}>
      <div style={styles.heading}>
        Choose a photo to illustrate your challenge:
      </div>
      <ul style={styles.list}>
        {photos.map((photo, i) =>
          <li key={i} style={styles.listItem(selected === photo)}>
            <button onClick={handleSelect(props, photo)} style={styles.photoButton}>
              <Image
                src={photo.small.src}
                alt={photo.title}
                style={styles.photo}
                width="100%"
                height="100%" />
            </button>
          </li>
        )}
      </ul>
      <div style={styles.footer}>
        <div style={styles.text}>
          This product uses the Flickr API but is not endorsed or certified by Flickr.
        </div>
        <Button onClick={handleSave(props)} style={styles.button}>Save</Button>
        <Button kind="secondary" onClick={onCancel} style={styles.button}>Cancel</Button>
      </div>
    </div>
  )
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    color: colors.grayscale.black,
    backgroundColor: colors.grayscale.white,
    padding: '1rem',
    boxSizing: 'border-box',
    [writeMediaQuery(breakpoints.small)]: {
      padding: '0.5rem'
    }
  },
  heading: {
    fontWeight: 500,
    marginBottom: '1rem',
    [writeMediaQuery(breakpoints.small)]: {
      marginBottom: '0.5rem'
    }
  },
  list: {
    listStyle: 'none',
    margin: '0 -1rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.25rem',
    width: 'calc(100% + 2rem)',
    whiteSpace: 'nowrap',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    boxSizing: 'border-box',
    [writeMediaQuery(breakpoints.small)]: {
      margin: '0 -0.5rem',
      width: 'calc(100% + 1rem)',
      paddingLeft: '0.25rem'
    }
  },
  listItem: (selected) => ({
    display: 'inline-block',
    width: '5rem',
    height: '5rem',
    borderWidth: '0.25rem',
    borderColor: selected ? 'black' : 'transparent',
    borderStyle: 'solid'
  }),
  photoButton: {
    appearance: 'none',
    padding: 0,
    width: '100%',
    height: '100%',
    border: 0
  },
  photo: {
    display: 'block',
    minWidth: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  footer: {
    display: 'flex',
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: '0.75rem',
    [writeMediaQuery(breakpoints.small)]: {
      paddingTop: '0.25rem'
    }
  },
  text: {
    flex: 1,
    fontSize: '0.9rem',
    [writeMediaQuery(breakpoints.small)]: {
      fontSize: '0.75rem'
    }
  },
  button: {
    marginLeft: '0.5rem'
  }
}

ChallengePhotoList.propTypes = {
  photos: PropTypes.array,
  selected: PropTypes.object,
  opened: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Radium(ChallengePhotoList)
