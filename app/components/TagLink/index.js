import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './TagLink.scss'

const TagLink = ({ tag }) => {
  return (
    <Link to={`/?q=${tag.name}`} className={styles.link}>{tag.name}</Link>
  )
}

TagLink.propTypes = {
  tag: PropTypes.object.isRequired
}

export default TagLink
