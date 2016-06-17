import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './Icon.scss'

export const contributions = require('./icons/contributions.svg')

const Icon = ({ className, icon, size = 20 }) => {
  return (
    <div
      className={cls(styles.icon, className)}
      dangerouslySetInnerHTML={{ __html: icon }}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  icon: PropTypes.string.isRequired
}

export default Icon
