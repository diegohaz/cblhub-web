import React, { PropTypes } from 'react'
import Radium, { Style } from 'radium'

import LayoutHeader from '../LayoutHeader'
import LayoutFooter from '../LayoutFooter'

const App = ({ ...props, children }) => {
  return (
    <div style={getStyle(props)}>
      <Style scopeSelector='body' rules={getBodyStyle(props)} />
      <LayoutHeader />
      {children}
      <LayoutFooter />
    </div>
  )
}

const getStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
  WebkitFontSmoothing: 'antialiased'
})

const getBodyStyle = () => ({
  margin: 0
})

App.propTypes = {
  children: PropTypes.any
}

export default Radium(App)
