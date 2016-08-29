import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'
import { colors } from '../../config/style'

const RouterLink = Radium(router.Link)

const Link = ({ style, kind = 'primary', ...props }) => {
  return (
    <RouterLink {...props} style={[getStyle(kind), style]} />
  )
}

const getStyle = (kind) => ({
  textDecoration: 'none',
  fontWeight: 500,
  color: colors[kind].dark,
  ':hover': {
    textDecoration: 'underline'
  }
})

Link.propTypes = {
  style: PropTypes.object,
  kind: PropTypes.string
}

export default Link
