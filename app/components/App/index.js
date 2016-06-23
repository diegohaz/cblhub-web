import React, { PropTypes } from 'react'
import { StyleRoot } from 'radium'
import styles from './App.scss'

import LayoutHeader from '../LayoutHeader'
import ProgressLoader from '../ProgressLoader'

const App = ({ ...props, loading, error, children }) => (
  <StyleRoot radiumConfig={{ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36' }} className={styles.app}>
    {loading && <ProgressLoader className={styles.loader} />}
    <LayoutHeader />
    {error && <div>error</div>}
    {children}
  </StyleRoot>
)

App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool
}

export default App
