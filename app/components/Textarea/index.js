import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors } from '../../config/style'

const Textarea = ({ ...props, style }) => {
  return (
    <textarea {...props} style={[getStyle(props), style]} />
  )
}

const getStyle = ({ invalid }) => ({
  display: 'block',
  width: '100%',
  color: 'inherit',
  margin: 0,
  boxSizing: 'border-box',
  fontSize: '1.2rem',
  border: `1px solid ${invalid ? colors.error.light : colors.grayscale.light}`,
  borderRadius: 2
})

Textarea.propTypes = {
  style: PropTypes.object,
  invalid: PropTypes.bool
}

export default Radium(Textarea)
