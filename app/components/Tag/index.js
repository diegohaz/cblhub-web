import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Tag.scss'

const Tag = ({ tag }) => {
  return (
    <div className={styles.tag}>
      <Link to={`/?q=${tag.name}`}>{tag.name}</Link>
    </div>
  )
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired
}

export default Tag
