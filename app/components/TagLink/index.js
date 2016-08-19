import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'

const Link = Radium(router.Link)

const TagLink = ({ tag, style }) => (
  <Link to={`/?q=${tag.name}`} style={[styles.link, style]}>{tag.name}</Link>
)

TagLink.propTypes = {
  tag: PropTypes.object.isRequired,
  style: PropTypes.object
}

const styles = {
  link: {
    display: 'inline-block',
    fontSize: '.8rem',
    padding: '.3rem .75rem',
    backgroundColor: '#ddd',
    border: '1px solid #ccc',
    color: '#333',
    ':hover': {
      backgroundColor: '#d5d5d5'
    }
  }
}

export default Radium(TagLink)
