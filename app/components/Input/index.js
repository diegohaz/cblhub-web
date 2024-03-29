import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors } from '../../config/style'

const Input = ({ ...props, style }) => {
  return (
    <input {...props} style={[getStyle(props), style]} />
  )
}

const getStyle = ({ invalid }) => ({
  display: 'block',
  width: '100%',
  color: 'inherit',
  margin: 0,
  boxSizing: 'border-box',
  fontSize: '1.125rem',
  height: '2.5rem',
  border: `1px solid ${colors[invalid ? 'error' : 'grayscale'].light}`,
  borderRadius: 2
})

Input.propTypes = {
  style: PropTypes.object,
  invalid: PropTypes.bool
}

export default Radium(Input)
