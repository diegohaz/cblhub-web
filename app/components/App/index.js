import React, { PropTypes } from 'react'
import styles from './App.scss'

import LayoutHeader from '../LayoutHeader'

const App = ({ ...props, loading, error, children }) => (
  <div className={styles.layout}>
    <LayoutHeader />
    {loading && <div>Loading...</div>}
    {error && <div>error</div>}
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool
}

export default App
