import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './ProgressLoader.scss'

const ProgressLoader = ({ className }) => {
  return (
    <div className={cls(styles.loader, className)}>
      <div className={styles.progress}></div>
    </div>
  )
}

ProgressLoader.propTypes = {
  className: PropTypes.string
}

export default ProgressLoader
