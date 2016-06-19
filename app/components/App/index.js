import React, { PropTypes } from 'react'
import styles from './App.scss'

import LayoutHeader from '../LayoutHeader'

const App = ({ ...props, children }) => (
  <div className={styles.layout}>
    <LayoutHeader />
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.object
}

export default App
