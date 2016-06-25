import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors } from '../../config/theme'

const Tooltip = ({ ...props, opened, style, children }) => {
  return (
    <div {...props}
      style={[{
        position: 'absolute',
        bottom: '100%',
        backgroundColor: colors.grayscale.black,
        borderRadius: 2,
        padding: '1rem',
        color: colors.grayscale.white,
        display: opened ? 'block' : 'none'
      }, style]}>
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
  opened: PropTypes.bool
}

export default Radium(Tooltip)
