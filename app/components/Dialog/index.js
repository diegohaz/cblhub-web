import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors } from '../../config/style'

const Dialog = ({ ...props, style, children }) => {
  return (
    <div style={[getStyle(props), style]}>{children}</div>
  )
}

const getStyle = ({ type = 'alert' }) => ({
  backgroundColor: colors[type].light,
  color: colors.grayscale.black,
  border: `1px solid ${colors[type].dark}`,
  padding: '1rem',
  margin: '0 0 1rem'
})

Dialog.propTypes = {
  style: PropTypes.object,
  type: PropTypes.oneOf(['alert', 'error', 'success']),
  children: PropTypes.any
}

export default Radium(Dialog)
