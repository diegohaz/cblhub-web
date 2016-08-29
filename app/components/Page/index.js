import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import Radium from 'radium'
import { writeMediaQuery, breakpoints } from '../../config/style'

const Page = ({ ...props, title, browserTitle = title, style, children }) => {
  return (
    <div style={getWrapperStyle()}>
      <Helmet title={`${browserTitle && browserTitle + ' | '}CBLHub`} />
      <div style={[getPageStyle(props), style]}>
        {title && <h2 style={getTitleStyle()}>{title}</h2>}
        {children}
      </div>
    </div>
  )
}

const getWrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto',
  padding: '1rem 1rem 4rem',
  [writeMediaQuery(breakpoints.small)]: {
    width: '100%',
    margin: 0,
    padding: 0
  }
})

const getPageStyle = () => ({
  maxWidth: 960,
  padding: '1rem',
  boxSizing: 'border-box',
  [writeMediaQuery(breakpoints.small)]: {
    width: '100%'
  }
})

const getTitleStyle = () => ({
  fontWeight: 300,
  fontSize: '2rem',
  marginTop: 0
})

Page.propTypes = {
  title: PropTypes.string,
  browserTitle: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
}

export default Radium(Page)
