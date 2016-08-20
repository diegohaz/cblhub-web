import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'
import { colors } from '../../config/style'

const Link = Radium(router.Link)

const TagLink = ({ tag, style }) => (
  <Link to={`/?q=${tag.name}`} style={[getLinkStyle(), style]}>{tag.name}</Link>
)

const getLinkStyle = () => ({
  display: 'inline-block',
  fontSize: '0.8rem',
  padding: '0.4rem 0.8rem',
  backgroundColor: colors.grayscale.light,
  border: `1px solid ${colors.grayscale.medium}`,
  color: colors.grayscale.black,
  textDecoration: 'none',
  borderRadius: '0.13rem',
  transition: 'background-color 250ms ease-out, color 250ms ease-out',
  ':hover': {
    backgroundColor: colors.grayscale.medium
  }
})

TagLink.propTypes = {
  tag: PropTypes.object.isRequired,
  style: PropTypes.object
}

export default Radium(TagLink)
