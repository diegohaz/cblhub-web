import React, { PropTypes } from 'react'
import styles from './Layout.scss'

import LayoutHeader from '../LayoutHeader'

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <LayoutHeader />
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.object
}

export default Layout
