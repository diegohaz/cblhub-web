import React, { PropTypes } from 'react'
import Radium, { Style } from 'radium'

export const challenge = require('./icons/challenge.svg')
export const contributions = require('./icons/contributions.svg')
export const down = require('./icons/down.svg')

const Icon = ({ style, icon, size = 20 }) => {
  return (
    <div style={[styles.icon, { width: `${size}px`, height: `${size}px` }, style]}>
      <Style scopeSelector='svg' rules={{ width: '100%', height: '100%', fill: 'currentcolor' }} />
      <span dangerouslySetInnerHTML={{ __html: icon }} />
    </div>
  )
}

Icon.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number,
  icon: PropTypes.string.isRequired
}

const styles = {
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    alignSelf: 'center',
    boxSizing: 'border-box'
  }
}

export default Radium(Icon)
