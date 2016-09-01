import React, { PropTypes } from 'react'
import Radium, { Style } from 'radium'

export const challenge = require('./icons/challenge.svg')
export const contributions = require('./icons/contributions.svg')
export const down = require('./icons/down.svg')
export const search = require('./icons/search.svg')
export const plus = require('./icons/plus.svg')
export const user = require('./icons/user.svg')
export const time = require('./icons/time.svg')
export const facebook = require('./icons/facebook.svg')
export const photo = require('./icons/photo.svg')

const Icon = ({ style, icon, size = 20 }) => {
  return (
    <div style={[styles.icon, { width: `${size}px`, height: `${size}px` }, style]}>
      <Style scopeSelector="svg" rules={{
        width: '100%',
        height: '100%',
        fill: 'currentcolor',
        stroke: 'currentcolor'
      }} />
      <span dangerouslySetInnerHTML={{ __html: icon }} />
    </div>
  )
}

Icon.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number,
  icon: PropTypes.any.isRequired
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
