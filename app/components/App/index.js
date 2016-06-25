import React, { PropTypes } from 'react'
import Radium, { Style } from 'radium'

import LayoutHeader from '../LayoutHeader'

const App = ({ ...props, loading, error, children }) => {
  return (
    <div style={styles.app}>
      <Style scopeSelector='body' rules={{ margin: 0 }} />
      <LayoutHeader />
      {children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  }
}

export default Radium(App)
