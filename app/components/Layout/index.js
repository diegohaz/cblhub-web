import React, { PropTypes } from 'react'
import styles from './Layout.scss'

const Layout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.object
}

export default Layout
